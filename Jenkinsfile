pipeline {
    agent any
      options {
        ansiColor('xterm')
    }
    stages {
         stage('Build') {
            steps {
            echo("I am in build")
            sshPublisher(
            continueOnError: true,
            publishers: [
                sshPublisherDesc(
                configName: "dev server",
                verbose: true,
                transfers: [
                    sshTransfer(
                        execCommand: "sudo rm -rf /var/www/web.performance.agentsoncloud.com"
                          ),
                    sshTransfer(
                        execCommand: "cd /var/www/ && git clone --branch release_1 https://github.com/agents-on-cloud/web.performance.agentsoncloud.com.git"
                          ),
               sshTransfer(
                        execCommand: "cd /var/www/web.performance.agentsoncloud.com && sudo npm i  && sudo npm run build"
                         ),
                ])
            ])
            }
        }
        stage('Test') {
            steps {
                echo ("I am in Test")
            }
        }
        stage('Deploy') {
            steps {
                echo("I am in Deploy")
                 sshPublisher(
            continueOnError: false, failOnError: true,
            publishers: [
                sshPublisherDesc(
                configName: "dev server",
                verbose: true,
                transfers: [
               sshTransfer(
                        execCommand: "cd /var/www/web.performance.agentsoncloud.com && pm2 restart"
                         ),
                ])
            ])
            }
        }
    }
     post {
        always {
           slackSend channel: "#development-jenkins", message: "${env.JOB_NAME} - #${env.BUILD_NUMBER} : Started . ",color:"good"
        }
        success {
          slackSend channel: "#development-jenkins", message: "${env.JOB_NAME} - #${env.BUILD_NUMBER} : Build Finshed Success . ",color:"good"
        }
        unstable {
           slackSend channel: "#development-jenkins", message: "${env.JOB_NAME} - #${env.BUILD_NUMBER} : Build have Error  . ", color:"warning"
        }
        failure {
            slackSend channel: "#development-jenkins", message: "${env.JOB_NAME} - #${env.BUILD_NUMBER} : Failure Build  . ",color:"danger"
        }
        changed {
             echo 'Things were different before...'
        }
    }
}