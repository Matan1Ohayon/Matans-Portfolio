import LinksCard from "./LinksCard";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <>
    <footer id="footer" className="page-footer">
      <div className="footer-title reveal up">
        <h3>
        Think I’d be a good match <br />
        for your company?
        </h3>
        <p>Let's Talk!</p>
      </div>
        <div className="reveal up">
            <LinksCard />
        </div>
        
    </footer>
    <footer className="footer-bottom">
      All Rights Reserved | Matan Ohayon © {year}
    </footer>
  </>
  );
  }
  
  export default Footer;
  