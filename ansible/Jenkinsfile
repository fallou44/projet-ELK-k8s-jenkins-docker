pipeline {
    agent any

    stages {
        stage('Déploiement Docker') {
            steps {
                script {
                    sh '''
                    cd ansible
                    ansible-playbook -i inventory/dev playbooks/docker.yml
                    '''
                }
            }
        }
        stage('Déploiement Kubernetes') {
            steps {
                script {
                    sh '''
                    cd ansible
                    ansible-playbook -i inventory/dev playbooks/kubernetes.yml
                    '''
                }
            }
        }
        stage('Déploiement Jenkins') {
            steps {
                script {
                    sh '''
                    cd ansible
                    ansible-playbook -i inventory/dev playbooks/jenkins.yml
                    '''
                }
            }
        }
        stage('Déploiement ELK') {
            steps {
                script {
                    sh '''
                    cd ansible
                    ansible-playbook -i inventory/dev playbooks/elk.yml
                    '''
                }
            }
        }
    }
}
