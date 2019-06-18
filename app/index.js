const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const mkdirp = require('mkdirp');
const utils = require('./utils');


var _serviceName = 'some-service';
var _servicePackageName = '';
var _serviceClassName = '';

module.exports = class extends Generator {
    
    initializing() {        
        this.log(yosay(
            chalk.green('Welcome to the Service Generator! ' + this.rootGeneratorVersion())
        ));
        var folderName = utils.getParentFolderName();        
        
        if (utils.isValidServiceName(folderName)) {
            _serviceName = folderName;
        }
    }

    prompting() {           
        var MainPrompt = [
            {
                name: 'MainPrompt',
                message: 'What would you like to do?',
                type: 'list',
                choices: [
                    {
                        name: 'Generate a new service',
                        value: 'RestServicePrompt'
                    }
                ]
            }
        ]
        
        var RestServicePrompt = [
            {
                type: 'input',
                name: 'serviceName',
                message: 'Enter the service name. (The service name should be in lower case and should end with -service)',
                default: _serviceName,
                validate: function (value) {
                    if (utils.isValidServiceName(value)) {                        
                        _serviceName = value.substr(0, value.lastIndexOf('-'));
                        _servicePackageName = value.substr(0, value.lastIndexOf('-')).replace('-', '');
                        return true;
                    } else {
                        return "Not a valid service name. The follwoing are the requirements for a valid project folder: \n" +
                            "1. The folder should be named in lowercase \n" +
                            "2. The folder name should end with '-service'";
                    }
                }
            },
            {
                type: 'input',
                name: 'serviceDescription',
                message: 'Provide a brief description about the service'                
            },
            {
                type: 'input',
                name: 'packageName',
                message: 'Enter the base package name',
                default: () => {
                    return 'com.api.' + _servicePackageName + '.api'                    
                }
            }
        ]

        var UpdatePrompt = [
            {
                type: 'string',
                name: 'name',
                message: 'This feature is still under development',
            }
        ]

        return this.prompt(MainPrompt).then(
            answer => {
                return this.prompt(eval(answer.MainPrompt)).then(
                    (props) => {
                        this.props = props;
                        this.props.selectedPrompt = answer.MainPrompt;
                    }
                )
            }
        )
     
    }
    
    writing() {
        this.props.version = this.rootGeneratorVersion()
        if (this.props.selectedPrompt == 'RestServicePrompt') {
            this.log('Generating Rest Service...')

            var rootDir = utils.getRootDirectory(this.props.serviceName);
            var srcDir = rootDir + '/src/main/java/' + this.props.packageName.replace(/\./g, '/')
            var resDir = rootDir + '/src/main/resources'
            var testDir = rootDir + '/src/test/java/' + this.props.packageName.replace(/\./g, '/')
            var testResDir = rootDir + '/src/test/resources'
            var gradleDir = rootDir + '/gradle/wrapper'

            utils.createDirectories([rootDir, srcDir, resDir, testDir, testResDir, gradleDir])

            this.fs.copy(this.templatePath('gradle/gradlew'), this.destinationPath(rootDir + '/gradlew'))
            this.fs.copy(this.templatePath('gradle/gradlew.bat'), this.destinationPath(rootDir + '/gradlew.bat'))
            this.fs.copy(this.templatePath('gradle/gradle.properties'), this.destinationPath(rootDir + '/gradle.properties'))
            this.fs.copyTpl(this.templatePath('gradle/build.gradle'), this.destinationPath(rootDir + '/build.gradle'),
                {
                    'className': utils.getClassName(_serviceName),
                    'serviceName': this.props.serviceName
                })
            this.fs.copy(this.templatePath('gradle/gradle-wrapper.jar'), this.destinationPath(gradleDir + '/gradle-wrapper.jar'))
            this.fs.copy(this.templatePath('gradle/gradle-wrapper.properties'), this.destinationPath(gradleDir + '/gradle-wrapper.properties'))

            this.fs.copy(this.templatePath('gitignore.txt'), this.destinationPath(rootDir + '/.gitignore'))
            this.fs.copyTpl(this.templatePath('README.md'), this.destinationPath(rootDir + '/README.md'),
                {
                    'serviceName': this.props.serviceName,
                    'version': this.props.version
                })

            this.fs.copyTpl(this.templatePath('configuration/application.properties'), this.destinationPath(resDir + '/application.properties'),
				{
					'className': utils.getClassName(_serviceName)
				})
            this.fs.copyTpl(this.templatePath('configuration/bootstrap.yml'), this.destinationPath(resDir + '/bootstrap.yml'),
                {
                    'serviceName': _serviceName					
                })
           

            //Java 
            this.fs.copyTpl(this.templatePath('java/_TemplateApplication.java'), this.destinationPath(srcDir + '/' + utils.getClassName(_serviceName) + 'Application.java'),
                {
                    'packageName': this.props.packageName,
                    'className': utils.getClassName(_serviceName)
                })
            this.fs.copyTpl(this.templatePath('java/_TemplateController.java'), this.destinationPath(srcDir + '/controller/' + utils.getClassName(_serviceName) + 'Controller.java'),
                {
                    'packageName': this.props.packageName,
                    'className': utils.getClassName(_serviceName),
                    'description': this.props.serviceDescription
                })
            this.fs.copyTpl(this.templatePath('java/_TemplateService.java'), this.destinationPath(srcDir + '/service/' + utils.getClassName(_serviceName) + 'Service.java'),
                {
                    'packageName': this.props.packageName,
                    'className': utils.getClassName(_serviceName)
                })
            this.fs.copyTpl(this.templatePath('java/_TemplateServiceImpl.java'), this.destinationPath(srcDir + '/service/' + utils.getClassName(_serviceName) + 'ServiceImpl.java'),
                {
                    'packageName': this.props.packageName,
                    'className': utils.getClassName(_serviceName)
                })
            this.fs.copyTpl(this.templatePath('java/_TemplateSwaggerConfiguration.java'), this.destinationPath(srcDir + '/config/' + 'SwaggerConfiguration.java'),
                {
                    'packageName': this.props.packageName,
                    'className': utils.getClassName(_serviceName)
                })            
            this.fs.copyTpl(this.templatePath('java/_TemplateReadyActuator.java'), this.destinationPath(srcDir + '/actuator/' + 'ReadyEndpoint.java'),
                {
                    'packageName': this.props.packageName,
                    'serviceName': this.props.serviceName,
                    'className': utils.getClassName(_serviceName)
                })

            //Java Test
            this.fs.copyTpl(this.templatePath('java/_TemplateApplicationTest.java'), this.destinationPath(testDir + '/' + utils.getClassName(_serviceName) + 'ApplicationTest.java'),
                {
                    'packageName': this.props.packageName,
                    'className': utils.getClassName(_serviceName)
                })
        } else {
            this.log('Sorry, this feature is still under development')
        }
    }  

};

