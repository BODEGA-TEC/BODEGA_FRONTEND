
import '../App/App.css';
// import axios from 'axios';
import Footer from '../components/Footer/Footer';
import Text from '../components/Text/Text';
const Home = () => {

  return (
    <>
      <div style = {{marginTop: '2%', marginBottom: '20%', textAlign: 'center'}}>
        <Text
          text_style = 'text_title'
          text = "Bienvenido al Sistema de Bodega de Electrónica (SIBE)"
        />
      </div>
      <div style={{position: 'fixed', bottom: '0', width: '100%'}}>
      <Footer/>
      </div>
    </>
  );
}

export default Home;
