import React from 'react'
import {Image} from 'react-bootstrap';

class Main extends React.Component{

    render(){
        var background = {backgroundSize : 'cover'};
        var textStyle = {
          position: 'absolute', 
          top: '30%', 
          left: '37%',
          background: 'transparent'
        };
        return(
            <div id="content">
                <div style={{width:'auto'}}>
                  <Image 
                    style={background} responsive 
                    src="img.jpg">
                  </Image>
                
                 
                 <div className="card mb-4" style={textStyle} >

                 <div className="card-body">
                   <form className="mb-3">
                        <div>
                            <label className="float-left text-white"><b>Input</b></label>
                            <span className="float-right text-white">
                               Balance: 0
                            </span>
                       </div>
                       <div className="input-group mb-4">
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="0"
                            required />
                          <div className="input-group-append">
                              <div className="input-group-text">
                                 <img src="" height='32' alt=""/>
                                   &nbsp;&nbsp;&nbsp; ETH
                               </div>
                           </div>
                       </div>
                       <div>
                          <label className="float-left text-white"><b>Output</b></label>
                          <span className="float-right text-white">
                             Balance: 0
                          </span>
                       </div>
                       <div className="input-group mb-2">
                         <input
                           type="text"
                           className="form-control form-control-lg"
                           placeholder="0"
                           disabled
                          />
                           <div className="input-group-append">
                               <div className="input-group-text">
                                 <img src="" height='32' alt=""/>
                                   &nbsp; AST
                                </div>
                           </div>
                       </div>
                       <div className="mb-5">
                           <span className="float-left text-white">Exchange Rate</span>
                           <span className="float-right text-white">1 ETH = 100 AST</span>
                       </div>
                      <button type="submit" className="btn btn-danger btn-block btn-lg">SWAP!</button>
                   </form>                      
                 </div>

                </div>
                </div>
            </div>
        )
    }
}
export default Main;