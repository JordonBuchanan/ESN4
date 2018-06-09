import React from 'react'

export default () => {
  return (
    <div className="container-fluid">
        <div className="row">
            <div className="col-sm-12 col-md-6 Footer">
                <p>Be a <span className="Highlight">GOAT</span> and follow us:</p>
                <p>
                    <a href="#"><i className="fab fa-twitter follow"></i></a>
                    <a href="#"><i className="fab fa-facebook follow"></i></a>
                    <a href="#"><i className="fab fa-instagram follow"></i></a>
                    <a href="#"><i className="fab fa-snapchat-ghost follow"></i></a>
                </p>
            </div>
            <div className="col-sm-12 col-md-6 Footer">
                <p className="text-center">&copy; <span className="Highlight">Copyright</span> Elite Sports News Inc.</p>
                <p className="text-center Xtra">Design by <a href="#">JBuchanan</a></p>
                <p className="text-center Xtra"><a href="#">Affiliates</a> | <a href="#">Site Map</a> | <a href="#">Legal</a></p>
            </div>
        </div>
    </div>
  )
}
