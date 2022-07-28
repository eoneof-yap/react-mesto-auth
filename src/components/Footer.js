const date = new Date();
const currentYear = date.getFullYear();

function Footer() {
  return (
    <footer className='footer'>
      <p className='footer__copyright'>© {currentYear} Mesto Russia</p>
    </footer>
  );
}
export default Footer;
