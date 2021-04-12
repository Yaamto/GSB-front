import React from 'react';
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import BillsList from '../components/billsList/BillsList'

class Bills extends React.Component {
  constructor(props){
    super(props)
  }

  render(){  
  return (

    <body class="d-flex flex-column h-100">
        <Header />
        <BillsList/>
        <Footer/>
    
    
        <script src="/docs/5.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-b5kHyXgcpbZJO/tY9Ul7kGkf1S0CWuKcCD38l8YkeH8z8QjE0GmW1gYU5S9FOnJ0" crossorigin="anonymous"></script>
    
          
      </body>
  )
  }
}

export default Bills;
