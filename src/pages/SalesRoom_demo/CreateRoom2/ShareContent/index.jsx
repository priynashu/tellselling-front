import { Component, useState } from 'react';
import { Step1 } from './Step1';
import { Step2 } from './Step2';
import styles from './sharecontent.module.scss';
import { toast } from 'react-toastify';

class ShareContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: this.props.Step,
      prospects: this.props.Prospectus,
      welcome_message:this.props.WelcomeMessage,
      cta:this.props.CTA
    }
  }

  UpdateWelcomeMessage = (welcome_message)=>{
    this.props.UpdateWelcomeMessage(welcome_message)
  } 
  UpdateProspects = (new_prospect) => {
    const temp = this.state.prospects;
    if (this.state.prospects.includes(new_prospect)) {
      toast.error('Prospect with same email or name already exists', {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    } else {
      temp.push(new_prospect);
      this.setState({prospects:temp});
      this.props.UpdateProspects(temp);
    }
  }
  EditProspects = (prospects) =>{
    this.setState(prospects)
    this.props.UpdateProspects(prospects);
  }

  render() {

    const changeScreen=(step)=>{
      this.props.UpdateStep(step);
    }

    const OnFirstStepDone = (e) =>{
      const form=e.formData;
      console.log(form);
      //setStep(2)
    }

    const SetCTA = (cta) =>{
      this.props.UpdateCTA(cta);
    }

    return (
      <div className={styles.share_content}>
        <h3 className={styles.share_content_title}>Share Content</h3>
        {this.state.step == 1 ? <Step1 OnComplete={OnFirstStepDone} changeScreen={changeScreen} Prospects={this.state.prospects} EditProspects={this.EditProspects}  UpdateProspects={this.UpdateProspects} /> : <Step2 WelcomeMessage={this.state.welcome_message} UpdateWelcomeMessage={this.UpdateWelcomeMessage} SetCTA={SetCTA} CTA={this.props.CTA} ChangeScreen={changeScreen}/> }
      </div>
    );
  }
}

export { ShareContent };
