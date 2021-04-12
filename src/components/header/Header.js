import React from 'react';
import './Header.css';

class Header extends React.Component {
  constructor(props){
    super(props)
  }

  render(){  
  return (

    <body class="d-flex flex-column h-100">
    
    <header>
      
      <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <div class="container-fluid">
          <a class="navbar-brand" href="#"></a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarCollapse">
            <ul class="navbar-nav me-auto mb-2 mb-md-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="/accueil">Mes fiches de frais</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="CreateBill">Saisir mes fiches de frais</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/" tabindex="-1" aria-disabled="true">Deconnexion</a>
              </li>
            </ul>
       
          </div>
        </div>
      </nav>
    </header>
    
   
    
        <script src="/docs/5.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-b5kHyXgcpbZJO/tY9Ul7kGkf1S0CWuKcCD38l8YkeH8z8QjE0GmW1gYU5S9FOnJ0" crossorigin="anonymous"></script>
    
          
      </body>
  )
  }
}

export default Header;
