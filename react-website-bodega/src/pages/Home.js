
import '../App/App.css';
// import axios from 'axios';
import Footer from '../components/Footer/Footer';
import Text from '../components/Text/Text';
const Home = () => {

  return (
    <>
      <div style = {{marginTop: '5%', marginBottom: '20%', textAlign: 'start', marginLeft: '95px'}}>
        <Text
          text_style = 'text_title2'
          text = "SIBE"
        />
        <Text
          text_style = 'subtitle'
          text = "Escuela de Ingeniería en Electrónica"
        />
      </div>
      <div style={{position: 'fixed', bottom: '0', width: '100%'}}>
      <Footer/>
      </div>
    </>
  );
}

export default Home;
