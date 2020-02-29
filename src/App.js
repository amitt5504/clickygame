import React, { Component } from "react";
import ImageCard from "./components/ImageCard";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import Score from "./components/Score";
import avengers from "./images.json";
import "./App.css";

//Initilize scores and message variables
let correctGuesses = 0;
let bestScore = 0;
let clickMessage = "Select your team of Avengers to defeat the Mad Titan Thanos!" + "Click on the same one twice and Thanos snaps!";

class App extends Component {
    
  //Setting this.state.matches to the matches json array
  state = {
      avengers,
      correctGuesses,
      bestScore,
      clickMessage
  };

  setClicked = id => {

      //Make a copy of the state matches array to work with
      const avengers = this.state.avengers;

      //Filter the array for those that are selected (have been clicked)
      const selectedAvenger = avengers.filter(avenger => avenger.id === id);

      //Conditionals for game score.
      //If the matched image's clicked value is already true, end game and reset
      if (selectedAvenger[0].selected){

          console.log ("Avengers Team Strength: " + correctGuesses);
          console.log ("Best Team Strength: " + bestScore);

          correctGuesses = 0;
          clickMessage = "The Mad Titan Thanos continues to reign supreme!"

          for (let i = 0 ; i < avengers.length ; i++){
              avengers[i].selected = false;
          }

          this.setState({clickMessage});
          this.setState({ correctGuesses });
          this.setState({avengers});

      //Otherwise, if false, increase score and reshuffle images
      } else if (correctGuesses < 16) {

          //Set its selected value to true
          selectedAvenger[0].selected = true;

          //Increase score
          correctGuesses++;
          
          //Update message to screen
          clickMessage = "You've added a new Avenger to the team! Let's keep this going!";

          if (correctGuesses > bestScore){
              bestScore = correctGuesses;
              this.setState({ bestScore });
          }

          //Reshuffle images
          avengers.sort(function(a, b){return 0.5 - Math.random()});

          //Set this.state.matches equal to the new matches array
          this.setState({ avengers });
          this.setState({correctGuesses});
          this.setState({clickMessage});
      } else {
          //User has correctly finished the game
          selectedAvenger[0].selected = true;

          //reset score
          correctGuesses = 0;

          clickMessage = "Avengers.....ASSEMBLE!!!!";
          bestScore = 12;
          this.setState({ bestScore });
          
          for (let i = 0 ; i < avengers.length ; i++){
              avengers[i].selected = false;
          }

          //Reshuffle images
          avengers.sort(function(a, b){return 0.5 - Math.random()});

          //Set this.state.matches equal to the new matches array
          this.setState({ avengers });
          this.setState({correctGuesses});
          this.setState({clickMessage});

      }
  };

  render() {
    return (
      <Wrapper>
        <Score>
          <h3 className="message">
            {this.state.clickMessage}
          </h3>
          <h4>
            Current Score: {this.state.correctGuesses}
            <br />
            Best Score: {this.state.bestScore}
          </h4>
        </Score>
        <Title>Avenge The Fallen</Title>
        {this.state.avengers.map(avenger => (
          <ImageCard
            setClicked={this.setClicked}
            id={avenger.id}
            key={avenger.id}
            name={avenger.name}
            image={avenger.image}
            selected={avenger.selected}
          />
        ))}
      </Wrapper>
    );
  }

}

export default App;
