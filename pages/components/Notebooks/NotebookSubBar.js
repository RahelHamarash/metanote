import React ,{Component , Fragment} from "react";
import {Icon , Card , Divider  } from "semantic-ui-react"
import {SpringSpinner} from 'react-epic-spinners'
import {Link } from "next/link"
class NotebookSubBar extends Component{


  constructor(props){



    super(props)
    this.state = {

      
    }
    this.changeArrow = this.changeArrow.bind(this)
    this.loadNotes = this.loadNotes.bind(this)
    this.openEditor = this.openEditor.bind(this)
  }



  componentDidMount(){


    this.props.notebooksMounted()


  }



  loadNotes(e , id){

    this.props.loadNotebookNotes(e , id)
  }

  changeArrow(e){

    e.preventDefault()
    this.props.changeNotebooksArrow(e)
  }

  openEditor(e, editorItem){

    
    this.props.openNotebooksEditor(e,editorItem._id , editorItem)
  }




  
  render(){
    
    const {styles,menuItems} = this.props

    const sidebarStyle={

      display:this.props.state.notebooksFetched ? "block":"flex",
      position: "relative",
      transition:styles.transition,
      paddingTop: 40,
      alignItems:this.props.state.notebooksFetched ?"none" :"center",
      width:"100%",
      alignContent : this.props.state.notebooksFetched ? "none" : "center",
      justifyContent : this.props.state.notebooksFetched ? "none" : "center"
    }
    const menuItemStyle = {
      display: "flex",
      justifyContent:styles.sidebarCollapsed ? "center":"flex-start" ,
      alignItems: "center",
      padding: `10px ${styles.sidebarCollapsed ? 0 : 10}px`,
      color: 'black',


      
    };
  

      return (
        <div style={sidebarStyle} className="scroll scale-in-left" >

          {
          this.props.state.notebooksFetched ?
            this.props.state.notebooksValue.map(item => {
                
                return (
                  <div style={{marginBottom:30 , display:"flex", flexDirection:"column" , justifyContent:"space-between" , paddingLeft:"15px" }} key={item._id}>
                    <div style={{display:"flex" }}>
                      <a style={{color:"white" , paddingRight:"7px" }}  onClick={this.changeArrow} href="#"><Icon className="arrow" id={item._id} state="false" name={this.props.state[item._id] ? "arrow down" :"arrow right"} link style={{color:this.props.state[item._id] ? "orange" : "white" }} /></a>
                      <Link href={this.props.state[`${item._id}${item._id}`] ? '/' : `/notebooks/${item._id}/notes` } style={{color:this.props.state[`${item._id}${item._id}`] ? "orange":"white" , wordWrap: "break-word"  }} id={`${item._id}${item._id}`}  className="notebooks" onClick={(e) => this.loadNotes( e, item._id)} >{item.notebook_title}</Link>
                      <Divider/>

                    </div>
                    
                    <Divider/>

                      <div style={{color:"white" , display:this.props.state[item._id] ? "flex" :"none" , flexDirection:"column" , paddingLeft:"15px" , justifyItems:"center"}} className={"scale-in-ver-top"}>
                        {item.notes.map(note => {
                                        

                          return (
                            <Fragment key={note._id} >
                              <Link
                              href={ this.props.state[note._id] ? '/':  `/notebooks/${item._id}/notes/${note._id}/show` }                              
                              onClick={(e) => this.openEditor(e,{ _id:item._id , notebook_title:item.notebook_title , note:{ _id:note._id , note_title:note.note_title }})} 
                              id={note._id} 
                              style={{paddingBottom:"3px" , color:this.props.state[note._id] ? "orange" : "white"}} 
                              className="truncate" title={note.note_title}  id={note._id}
                                  
                              >
                              {note.note_title}
                              </Link>
                              <Divider/>
                            </Fragment>
                            
                          )
                        })}

                      </div>
                    
                    
                    <span style={{color:"grey"}}>{`${item.notes.length} notes`}</span>
                  </div>
                )
            })
          :
         
          <SpringSpinner color="orange" />
          }

        </div>
      ) 
  }
}

export default NotebookSubBar;
