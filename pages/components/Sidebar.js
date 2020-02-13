import React ,{Component} from "react";
import {Icon } from "semantic-ui-react"
import NotebookSubBar from "./Notebooks/NotebookSubBar";
import {Link} from "next/link"
class Sidebar extends Component{


  constructor(props){

    super(props)
    this.state = {

    }


    this.notebookSubBar = this.notebookSubBar.bind(this)

  }

  notebookSubBar(e){

    e.preventDefault()
    this.props.openNotebookSubBar()  

  }
  
  render(){
    
    const {styles , menuItems} = this.props

    const sidebarStyle={

      height: "100%",
      width:styles.sidebarWidth,
      position: "fixed",
      backgroundColor:'#333',
      paddingTop: 50,
      transition:styles.transition ,
      opacity:this.props.state.sidebarOpen ? 1:0,
      

    }
    const menuItemStyle = {
      display: "flex",
      justifyContent:styles.sidebarCollapsed ? "center":"flex-start" ,
      alignItems: "center",
      padding: `30px ${styles.sidebarCollapsed ? 0 : 10}px`,
      color:"white",
    }
  
    const iconStyle = {
      fontSize: 26,
      marginRight: styles.sidebarCollapsed ? 0 : 10,
      
    }
  
    const logoStyle = {
      textAlign: "center",
      color: styles.white(),
      fontSize: 34,
      marginBottom: 60,
      fontWeight: "bold"
    }
    if(!this.props.state.notebooks){

      return (

          <div style={sidebarStyle} className="sidebar">
          
            <a style={menuItemStyle}  title={"Notebooks"} onClick={this.notebookSubBar} href="#">
              <span style={iconStyle} >{<Icon name={"book"} style={{color:this.props.state.notebooks ? "orange": "white"}} id="icon" size="small" />}</span>
            </a>
            <a style={menuItemStyle}   href="#" title={"Mindmaps"}>
              <span style={iconStyle}>{<Icon name={"sitemap"} style={{color:this.state.mindmaps ? "orange" : "white"}} size="small"/>}</span>
            </a>
            <a style={menuItemStyle}   href="" title={"Flash cards"}>
              <span style={iconStyle}>{<Icon name={"map outline"} style={{color:this.state.flashcards ? "orange": "white"}} size="small"/>}</span>
            </a>  
            <a style={menuItemStyle}href="#" title={"Todo Lists"}>
              <span style={iconStyle}>{<Icon name={"checkmark box"} style={{color:this.state.todos ? "orange": "white"}} size="small"/>}</span>
            </a>   
          </div>

      )
    }else{

    

        sidebarStyle.display = "flex"
        sidebarStyle.flexDirection = "row"


      return(
          <div style={sidebarStyle}>

            <div className="sidebar">

              <a  style={menuItemStyle} title={"Notebooks"} onClick={this.notebookSubBar} href="#"> 
                <span style={iconStyle}>{<Icon name={"book"} style={{color:this.props.state.notebooks ? "orange": "white"}} size="small"/>}</span>
              </a>
              <a style={menuItemStyle}  href="#" title={"Mindmaps"}>
                <span style={iconStyle}>{<Icon name={"sitemap"} style={{color:this.state.mindmaps ? "orange" : "white"}} size="small"/>}</span>
              </a>
              <a style={menuItemStyle}  href="" title={"Flash cards"}>
                <span style={iconStyle}>{<Icon name={"map outline"} style={{color:this.state.flashcards ? "orange": "white"}} size="small"/>}</span>
              </a>  
              <a style={menuItemStyle}  href="" title={"Todo Lists"}>
                <span style={iconStyle}>{<Icon name={"checkmark box"} style={{color:this.state.todos ? "orange": "white"}} size="small"/>}</span>
              </a>   
            </div>
            <div className="subSidebar">
              <NotebookSubBar 
                menuItems={menuItems} 
                styles={styles} 
                state={this.props.state}
                loadNotebookNotes={this.props.loadNotebookNotes} 
                notebooksMounted={this.props.notebooksMounted}
                changeNotebooksArrow={this.props.changeNotebooksArrow}
                openNotebooksEditor={this.props.openNotebooksEditor}  
              />
            </div>

          </div>
      )
    }
      
  }
};

export default Sidebar;
