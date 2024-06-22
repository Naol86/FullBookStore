import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';

function UserLayout({ elements }) {
  return (
    <div className=''>
      <NavBar />

      {elements.map((el, i) => (
        <div key={i}>{el}</div>
      ))}

      <Footer />
    </div>
  );
}

export default UserLayout;
