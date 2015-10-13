var esprima = require("esprima");
var options = {tokens:true, tolerant: true, loc: true, range: true };
var faker = require("faker");
var fs = require("fs");
faker.locale = "en";
var mock = require('mock-fs');
var _ = require('underscore');
var Random = require('random-js');

function main()
{
	var args = process.argv.slice(2);

	if( args.length == 0 )
	{
		args = ["subject.js"];
	}
	var filePath = args[0];

	constraints(filePath);

	generateTestCases(filePath);

}

var engine = Random.engines.mt19937().autoSeed();

function createConcreteIntegerValue( greaterThan, constraintValue )
{
	if( greaterThan )
		return Random.integer(constraintValue,constraintValue+10)(engine);
	else
		return Random.integer(constraintValue-10,constraintValue)(engine);
}

function Constraint(properties)
{
	this.ident = properties.ident;
	this.expression = properties.expression;
	this.operator = properties.operator;
	this.value = properties.value;
	this.funcName = properties.funcName;
	// Supported kinds: "fileWithContent","fileExists"
	// integer, string, phoneNumber
	this.kind = properties.kind;
}

function fakeDemo()
{
	//console.log( faker.phone.phoneNumber() );
	//console.log( faker.phone.phoneNumberFormat() );
	//console.log( faker.phone.phoneFormats() );
}

var functionConstraints =
{
}

var mockFileLibrary = 
{
	pathExists:
	{
		'path/fileExists': {}
	},
	dirWithFiles:
	{
		'path/fileExists': { file: 'sample text' }
	},
	fileWithContent:
	{
		pathContent: 
		{	
  			file1: 'text content',
		}
	},
	fileWithoutContent:
	{
		pathContent: 
		{	
  			file1: '',
		}
	}
};

/**/
function cartesianProductOf() {
    return _.reduce(arguments, function(a, b) {
        return _.flatten(_.map(a, function(x) {
            return _.map(b, function(y) {
                return x.concat([y]);
            });
        }), true);
    }, [ [] ]);
};

function generateTestCases(filePath)
{

	var content = "var subject = require('./"+filePath+"')\nvar mock = require('mock-fs');\n";
	for ( var funcName in functionConstraints )
	{
		var params = {};
		var fileParams = {};

		// initialize params
		for (var i =0; i < functionConstraints[funcName].params.length; i++ )
		{
			var paramName = functionConstraints[funcName].params[i];
			//params[paramName] = '\'' + faker.phone.phoneNumber()+'\'';
			fileParams[paramName] = '\'\'';
			params[paramName] = new Array();
		}

		//console.log( params );

		// update parameter values based on known constraints.
		var constraints = functionConstraints[funcName].constraints;
		// Handle global constraints...
		var fileWithContent = _.some(constraints, {kind: 'fileWithContent' });
		var fileWithoutContent = _.some(constraints, {kind: 'fileWithoutContent' });
		var pathExists      = _.some(constraints, {kind: 'fileExists' });
		var dirWithFiles 	= _.some(constraints, {kind: 'dirWithFiles'})

		var args, fileArgs;

		// plug-in values for parameters
		for( var c = 0; c < constraints.length; c++ )
		{
			var constraint = constraints[c];
			if( params.hasOwnProperty( constraint.ident ) )
			{
				if( pathExists || fileWithContent || dirWithFiles || fileWithoutContent)
					fileParams[constraint.ident] = constraint.value;
				//console.log(constraint.ident);
				params[constraint.ident].push(constraint.value);
			}

			if(c == constraints.length - 1 && funcName!='fileTest'){
				//console.log(params);
				var argumentMap = Object.keys(params).map(function(key){return params[key];});
				args = cartesianProductOf.apply(this, argumentMap);
				//console.log(args);
				for(var j = 0; j < args.length; j++)
					content += "subject.{0}({1});\n".format(funcName, args[j] );
			}
		}

		// Prepare function arguments.
		
		if( pathExists || fileWithContent || dirWithFiles || fileWithoutContent)
		{
			var fileArgs = ['"path/fileExists"', '"pathContent/file1"'];
			content += generateMockFsTestCases(pathExists,fileWithContent, dirWithFiles, fileWithoutContent, funcName, fileArgs);
			// Bonus...generate constraint variations test cases....
			content += generateMockFsTestCases(!pathExists,fileWithContent, dirWithFiles, fileWithoutContent, funcName, fileArgs);
			content += generateMockFsTestCases(pathExists, !fileWithContent, dirWithFiles, fileWithoutContent, funcName, fileArgs);
			content += generateMockFsTestCases(pathExists,fileWithContent, !dirWithFiles, fileWithoutContent, funcName, fileArgs);
			content += generateMockFsTestCases(pathExists,fileWithContent, dirWithFiles, !fileWithoutContent, funcName, fileArgs);
			content += generateMockFsTestCases(!pathExists,!fileWithContent, dirWithFiles, fileWithoutContent, funcName, fileArgs);
			content += generateMockFsTestCases(pathExists,!fileWithContent, !dirWithFiles, fileWithoutContent, funcName, fileArgs);
			content += generateMockFsTestCases(pathExists,fileWithContent, !dirWithFiles, !fileWithoutContent, funcName, fileArgs);
			content += generateMockFsTestCases(!pathExists,fileWithContent, !dirWithFiles, fileWithoutContent, funcName, fileArgs);
			content += generateMockFsTestCases(!pathExists,fileWithContent, dirWithFiles, !fileWithoutContent, funcName, fileArgs);
			content += generateMockFsTestCases(pathExists,!fileWithContent, dirWithFiles, !fileWithoutContent, funcName, fileArgs);
			content += generateMockFsTestCases(!pathExists,!fileWithContent, !dirWithFiles, fileWithoutContent, funcName, fileArgs);
			content += generateMockFsTestCases(!pathExists,!fileWithContent, dirWithFiles, !fileWithoutContent, funcName, fileArgs);
			content += generateMockFsTestCases(pathExists,!fileWithContent, !dirWithFiles, !fileWithoutContent, funcName, fileArgs);
			content += generateMockFsTestCases(!pathExists,fileWithContent, !dirWithFiles, !fileWithoutContent, funcName, fileArgs);
			content += generateMockFsTestCases(!pathExists,!fileWithContent, !dirWithFiles, !fileWithoutContent, funcName, fileArgs);
		}

	}


	fs.writeFileSync('test.js', content, "utf8");

}

function generateMockFsTestCases (pathExists,fileWithContent, dirWithFiles, fileWithoutContent, funcName,args) 
{
	var testCase = "";
	// Build mock file system based on constraints.
	var mergedFS = {};
	if( pathExists )
	{
		for (var attrname in mockFileLibrary.pathExists) 
			{ 
				mergedFS[attrname] = mockFileLibrary.pathExists[attrname]; 
			}

	}
	if(dirWithFiles){
		for (var attrname in mockFileLibrary.dirWithFiles) 
			{ 
				mergedFS[attrname] = mockFileLibrary.dirWithFiles[attrname]; 
			}
	}
	if( fileWithContent )
	{
		for (var attrname in mockFileLibrary.fileWithContent) 
			{ 
				mergedFS[attrname] = mockFileLibrary.fileWithContent[attrname]; 
			}
		
	}
	if( fileWithoutContent )
	{
		for (var attrname in mockFileLibrary.fileWithoutContent) 
			{ 
				mergedFS[attrname] = mockFileLibrary.fileWithoutContent[attrname]; 
			}
		
	}


	testCase += 
	"mock(" +
		JSON.stringify(mergedFS)
		+
	");\n";

	
	testCase += "\tsubject.{0}({1});\n".format(funcName, args );
	testCase+="mock.restore();\n";
	return testCase;
}

String.prototype.insertAt=function(index, string) { 
  return this.substr(0, index) + string + this.substr(index);
}

function constraints(filePath)
{
   var buf = fs.readFileSync(filePath, "utf8");
	var result = esprima.parse(buf, options);

	traverse(result, function (node) 
	{
		if (node.type === 'FunctionDeclaration') 
		{
			var funcName = functionName(node);
			//console.log("Line : {0} Function: {1}".format(node.loc.start.line, funcName ));

			var params = node.params.map(function(p) {return p.name});

			functionConstraints[funcName] = {constraints:[], params: params};

			// Check for expressions using argument.
			traverse(node, function(child)
			{
				if( child.type === 'BinaryExpression' && (child.operator == "==" || child.operator == "<" || child.operator == ">"))
				{
					if( child.left.type == 'Identifier' && params.indexOf( child.left.name ) > -1)
					{
						// get expression from original source code:
						var expression = buf.substring(child.range[0], child.range[1]);
						var rightValue = buf.substring(child.right.range[0], child.right.range[1]);
						var rightHand = child.right.value;

						//console.log(rightHand+" : "+typeof rightHand);

						functionConstraints[funcName].constraints.push( 
							new Constraint(
							{
								ident: child.left.name,
								value: rightValue,
								funcName: funcName,
								kind: "integer",
								operator : child.operator,
								expression: expression
							}));

						if(typeof rightHand=='string'){

							functionConstraints[funcName].constraints.push( 
							new Constraint(
							{
								ident: child.left.name,
								value: "\""+"a"+rightHand+"\"",
								funcName: funcName,
								kind: "integer",
								operator : child.operator,
								expression: expression
							}));

							functionConstraints[funcName].constraints.push( 
							new Constraint(
							{
								ident: child.left.name,
								value: "\""+rightHand+"z"+"\"",
								funcName: funcName,
								kind: "integer",
								operator : child.operator,
								expression: expression
							}));
						}
						
						if (typeof rightHand=='undefined') {
							
							functionConstraints[funcName].constraints.push( 
							new Constraint(
							{
								ident: child.left.name,
								value: 10,
								funcName: funcName,
								kind: "integer",
								operator : child.operator,
								expression: expression
							}));
						};

						if(typeof rightHand=='number'){

							functionConstraints[funcName].constraints.push( 
								new Constraint(
								{
									ident: child.left.name,
									value: rightHand+10,
									funcName: funcName,
									kind: "integer",
									operator : child.operator,
									expression: expression
								}));

							functionConstraints[funcName].constraints.push( 
								new Constraint(
								{
									ident: child.left.name,
									value: rightHand-10,
									funcName: funcName,
									kind: "integer",
									operator : child.operator,
									expression: expression
								}));
						}
					}else if(child.left.type == "CallExpression" && 
								child.left.callee.property && 
								child.left.callee.property.name =="indexOf" && 
								params.indexOf( child.left.callee.object.name) > -1 )
					{
						// get expression from original source code:
						var expression = buf.substring(child.range[0], child.range[1]);
						var rightValue = buf.substring(child.right.range[0], child.right.range[1]);
						var rightHand = child.right.value;

						var tempStr = new Array(rightHand + 1).join(  );
						functionConstraints[funcName].constraints.push( 
							new Constraint(
							{
								ident: child.left.callee.object.name,
								value: "\""+String(tempStr.insertAt(rightHand, child.left.arguments[0].value))+"\"",
								funcName: funcName,
								kind: "integer",
								operator : child.operator,
								expression: expression
							}));
						
						tempStr = new Array(rightHand + 11).join();
						functionConstraints[funcName].constraints.push( 
							new Constraint(
							{
								ident: child.left.callee.object.name,
								value: "\""+String(tempStr.insertAt(rightHand+10, child.left.arguments[0].value))+"\"",
								funcName: funcName,
								kind: "integer",
								operator : child.operator,
								expression: expression
							}));
					}else if(child.left.type == 'Identifier' && funcName == 'blackListNumber'){
						var expression = buf.substring(child.range[0], child.range[1]);
						var rightValue = buf.substring(child.right.range[0], child.right.range[1]);
						var rightHand = child.right.value;

						var randomNumber = "1234567";


						functionConstraints[funcName].constraints.push( 
								new Constraint(
								{
									ident: params,
									value: "\""+randomNumber.insertAt(0, rightHand)+"\"",
									funcName: funcName,
									kind: "integer",
									operator : child.operator,
									expression: expression
								}));

						functionConstraints[funcName].constraints.push( 
								new Constraint(
								{
									ident: params,
									value: "\""+randomNumber.insertAt(4, rightHand)+"\"",
									funcName: funcName,
									kind: "integer",
									operator : child.operator,
									expression: expression
								}));
					}
				}

				if(child.type === 'LogicalExpression' && child.operator == "||" ){
					
					if(child.right.argument.type === 'MemberExpression' && params.indexOf( child.right.argument.object.name ) > -1 && child.right.argument.property){
						var expression = buf.substring(child.range[0], child.range[1]);
						functionConstraints[funcName].constraints.push( 
							new Constraint(
							{
								ident: child.left.argument.name,
								value:  "{\""+child.right.argument.property.name+"\":true}",
								funcName: funcName,
								kind: "integer",
								operator : child.operator,
								expression: expression
							}));
						for(var i = 0; i < params.length; i++){
							functionConstraints[funcName].constraints.push( 
							new Constraint(
							{
								ident: params[i],
								value:  '""',
								funcName: funcName,
								kind: "integer",
								operator : child.operator,
								expression: expression
							}));
						}
					}
				}



				if( child.type == "CallExpression" && 
					 child.callee.property &&
					 child.callee.property.name =="readFileSync" )
				{
					for( var p =0; p < params.length; p++ )
					{
						if( child.arguments[0].name == params[p] )
						{
							functionConstraints[funcName].constraints.push( 
							new Constraint(
							{
								ident: params[p],
								value:  "'pathContent/file1'",
								funcName: funcName,
								kind: "fileWithContent",
								operator : child.operator,
								expression: expression
							}));

							functionConstraints[funcName].constraints.push( 
							new Constraint(
							{
								ident: params[p],
								value:  "'pathContent/file1'",
								funcName: funcName,
								kind: "fileWithoutContent",
								operator : child.operator,
								expression: expression
							}));
						}
					}
				}

				if( child.type == "CallExpression" &&
					 child.callee.property &&
					 child.callee.property.name =="existsSync")
				{
					for( var p =0; p < params.length; p++ )
					{
						if( child.arguments[0].name == params[p] )
						{
							functionConstraints[funcName].constraints.push( 
							new Constraint(
							{
								ident: params[p],
								// A fake path to a file
								value:  "'path/fileExists'",
								funcName: funcName,
								kind: "fileExists",
								operator : child.operator,
								expression: expression
							}));
							functionConstraints[funcName].constraints.push( 
							new Constraint(
							{
								ident: params[p],
								value:  "'pathContent/file1'",
								funcName: funcName,
								kind: "fileWithoutContent",
								operator : child.operator,
								expression: expression
							}));
							
						}
					}
				}

				if( child.type == "CallExpression" &&
						 child.callee.property &&
						 child.callee.property.name =="readdirSync")
				{
					for( var p =0; p < params.length; p++ )
					{
						if( child.arguments[0].name == params[p] )
						{
							functionConstraints[funcName].constraints.push( 
							new Constraint(
							{
								ident: params[p],
								// A fake path to a file
								value:  "'path/fileExists'",
								funcName: funcName,
								kind: "fileExists",
								operator : child.operator,
								expression: expression
							}));

							functionConstraints[funcName].constraints.push( 
							new Constraint(
							{
								ident: params[p],
								// A fake path to a file
								value:  "'path/dirWithFiles'",
								funcName: funcName,
								kind: "dirWithFiles",
								operator : child.operator,
								expression: expression
							}));
						}
					}
				}
		
			});//console.log( functionConstraints[funcName]);
		}
	});
}

function traverse(object, visitor) 
{
    var key, child;

    visitor.call(null, object);
    for (key in object) {
        if (object.hasOwnProperty(key)) {
            child = object[key];
            if (typeof child === 'object' && child !== null) {
                traverse(child, visitor);
            }
        }
    }
}

function traverseWithCancel(object, visitor)
{
    var key, child;

    if( visitor.call(null, object) )
    {
	    for (key in object) {
	        if (object.hasOwnProperty(key)) {
	            child = object[key];
	            if (typeof child === 'object' && child !== null) {
	                traverseWithCancel(child, visitor);
	            }
	        }
	    }
 	 }
}

function functionName( node )
{
	if( node.id )
	{
		return node.id.name;
	}
	return "";
}


if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}

main();
