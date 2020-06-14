import React from 'react';
import axios from 'axios';
class Author extends React.Component {
   
    constructor(props) {
        super(props);
        var imagesArray = [];
        this.state = {
            images: []
        };
        for(var i=1; i<=8; i++) {
            imagesArray.push(axios.get('https://picsum.photos/id/' + (i*10) + '/info'))
        }
        Promise.all(imagesArray).then(function(res) {
            this.setState({
                images: res.map((response) => response.data)
            });
        }.bind(this))
        .catch(function(err) {
            console.log(err);
        });
        
    }
    
    
    
    render() {
        
        var cards = this.state.images.map(function(item) {
            return (
                
                <div class="card" key={item.id}>
                    <img src={item.download_url} class="card-image" alt="Image"/>
                    <div class="author">{item.author}</div>
                    <a role="button" href={item.download_url} target="_blank" rel="noopener noreferrer" class="download">Download</a>
                </div>
               
            );
        });
        
        return (
            <>  
            <div class="he"><center><h2>Unsplash</h2></center>

            
                <section aria-label="Image Card Container" class="image-cards-container">
                    {cards}
                </section>
                </div>
                
            </>
            );
        }
    }
    export default Author;