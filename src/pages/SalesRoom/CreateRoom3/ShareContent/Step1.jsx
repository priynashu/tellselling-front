import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import styles from './sharecontent.module.scss';
import { Component } from 'react';
import { Input } from '@mui/material';
import ProspectItem from './ProspectItem';

class Step1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prospect: {},
      prospects: this.props.Prospects,
      sales_person_name: this.props.sales_person_name,
      sales_amount: this.props.sales_amount
    }
  }
  render() {
    const handleInput = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      this.setState({ prospect: { ...this.state.prospect, [name]: value } });
    }

    const AddProspect = (e) => {
      e.preventDefault();
      //Clear Form
      document.getElementById('email').value = "";
      document.getElementById('first_name').value = "";
      document.getElementById('last_name').value = "";
      document.getElementById('organization').value = "";
      document.getElementById('name').value = "";
      document.getElementById('amount').value = "";
      // Updating parent components 
      this.props.UpdateProspects(this.state.prospect);
      // Clearing current component data
      this.setState({ prospect: {} });
    }
    return (
      <>
        <ProspectItem ProspectsData={this.state.prospects} EditProspects={this.props.EditProspects} />
        <div className={styles.text_wrapper}>
          {/*<div className={styles.stepper}>1/4</div>*/}
          <h5>Create a prospect</h5>
        </div>

        <Box component='form' onSubmit={AddProspect}>
          <TextField type='email' id='email' label='Email' name='email' value={this.state.prospect.name} onChange={handleInput} fullWidth variant='outlined' size='small' style={{ marginBottom: '20px' }} required />
          <TextField type='text' id='first_name' label='First Name' name='first_name' onChange={handleInput} fullWidth variant='outlined' size='small' style={{ marginBottom: '20px' }} required />
          <TextField type='text' id='last_name' label='Last Name' name='last_name' onChange={handleInput} fullWidth variant='outlined' size='small' style={{ marginBottom: '20px' }} required />
          <TextField type='text' id='organization' label='Organization' name='organization' onChange={handleInput} fullWidth variant='outlined' size='small' style={{ marginBottom: '20px' }} required />

          <h4 style={{ margin: '10px 0 15px 0', fontSize: '14px' }}>Deal Information</h4>
          <TextField name="deal_name" label='Name' id='name' onChange={handleInput} fullWidth variant='outlined' size='small' style={{ marginBottom: '20px' }} required />
          <TextField name="amount" label='Amount' id='amount' onChange={handleInput} fullWidth variant='outlined' size='small' style={{ marginBottom: '20px' }} required />
          <div style={{ float: 'left' }}>
            <Button type='submit' variant='outlined' color='success' style={{ marginBottom: 15 }}>Save</Button>
          </div>
        </Box>
        <div style={{ float: 'right' }}>
          <Button type='submit' variant='contained' onClick={()=>this.props.changeScreen(2)} color='success'>
            Continue
          </Button>
        </div>

      </>
    );
  };

}


export { Step1 };
