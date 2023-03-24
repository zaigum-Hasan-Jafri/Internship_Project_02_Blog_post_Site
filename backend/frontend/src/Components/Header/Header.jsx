import './Header.css'
const Header = () => {
  return (
    <div className='header'>
        <div className="header-titles">
            <span className="header-titles-sm f-josefin">Your Own</span>
            <span className="header-titles-lg">Blog</span>
        </div>
        <img src="http://source.unsplash.com/800x600/?Blog" alt="Blog-img" className="header-img" />
    </div>
  )
}

export default Header