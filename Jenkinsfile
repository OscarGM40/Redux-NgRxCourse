pipeline {
  agent any
  stages {
    stage("build"){
      steps {
        echo 'building the application...'
        script {
          def build = 2 + 2 > 3 ? 'Groovy is cool' : 'Groovy is not cool'
          echo build
      }
    }
    stage("test"){
      steps {
         echo 'testing the application...'
      }
    }
    stage("deploy"){
      steps {
        echo 'deploying the application...'
      }
    }
  }
}
