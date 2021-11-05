
import style from '@styles/principalPage/footer.module.css'
function Footer () {
  return (
    <footer className={style.footer}>
      <a rel="noreferrer" href="https://www.facebook.com/carloshabid.vergelbarraza" className="white feedback" target="_blank">
        <i className="fab fa-facebook"/> facebook
      </a>
      <a href="https://twitter.com/cabiver7w7" className="white feedback">
        <i className="fab fa-twitter"/> twitter
      </a>
      <a href="https://www.instagram.com/cabiver01/?hl=es-la" className="white feedback">
        <i className="fab fa-instagram"/> instagram
      </a>

    </footer>
  )
}
export default Footer
