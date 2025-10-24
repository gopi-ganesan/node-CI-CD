pipeline{
    agent any

    evironment {
        IMAGES_NAME = 'node-app:v1'
        CONTAINER_NAME = 'node-app-cn'
    }

    stages{
        stage('git clone') {
            steps {
                git(
                    url:'https://github.com/gopi-ganesan/node-CI-CD.git'
                    bracnch:'main'
                    credentialsId:'github-token'
                )
            }
        }

        stage('docker build') {
            steps {
                docker build -t "${IMAGES_NAME}" .
            }
        }

        stage('docker remove'){
            steps{
                sh'''
                docker stop ${CONTAINER_NAME} || true
                docker rm ${CONTAINER_NAME} || true
              '''
            }
        }

        stage('docker run'){
            steps{
                sh'''
                docker run -d -p 8080:8080 --name ${CONTAINER_NAME} ${IMAGES_NAME}
              '''
            }
        }

        stage('docker test') {
            steps {
              sh  'docker exec ${CONTAINER_NAME} npn test'
            }
        }
    }

    post {
        success {
            echo 'The pipeline has succeeded!'
        }
        failure {
            echo 'The pipeline has failed.'
        }
    }
}