pipeline {
    agent any

    environment {
        IMAGE_NAME = 'node-app:v4'
        CONTAINER_NAME = 'node-app-c4'
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-cred')
    }

    stages {
        stage('Git Clone') {
            steps {
                echo 'Cloning repository...'
                git(
                    url: 'https://github.com/gopi-ganesan/node-CI-CD.git',
                    branch: 'main',
                    credentialsId: 'github-token'
                )
            }
        }

        stage('Docker Build') {
            steps {
                echo 'Building Docker image...'
                sh 'docker build -t ${IMAGE_NAME} .'
            }
        }

        stage('Docker Remove') {
            steps {
                echo 'Stopping and removing old container (if exists)...'
                sh '''
                    docker stop ${CONTAINER_NAME} || true
                    docker rm ${CONTAINER_NAME} || true
                '''
            }
        }

        stage('Docker Run') {
            steps {
                echo 'Running new container...'
                sh 'docker run -d -p 8081:8000 --name ${CONTAINER_NAME} ${IMAGE_NAME}'
            }
        }

        stage('Docker Test') {
            steps {
                echo 'Running tests inside container...'
                sh 'docker exec ${CONTAINER_NAME} npm test || true'
            }
        }
    }

    post {
        success {
            echo ' The pipeline has succeeded!'
        }
        failure {
            echo ' The pipeline has failed.'
        }
    }
}
