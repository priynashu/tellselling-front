import React, { Component } from 'react'
import PageEditor from './PageEditor/PageEditor';
import Editor from './Editor/Editor';
import { getLocalUser } from '../../utils/GetLocalUser';
import Header from '../../components/Header';
export class LandingPages extends Component {
  
  render() {
    const localUser = getLocalUser();  
    const tenant_id=localUser.tenantId;
    console.log(tenant_id);
    return (
      <div>
        <Header title="Landing Page" links={['Landing Page Editor']}/>
        <iframe src={'https://app-dev.tellselling.tech/web-editor/index.php?tenant_id='+tenant_id} style={{height:'640px',width:'100%'}}/>
      </div> 
    )
  }

}

export default LandingPages;

