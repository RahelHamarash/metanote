import React , {Component , Fragment} from "react";
import {Icon , Card , Image , Header , Divider , Button , Popup , Grid} from "semantic-ui-react"
import {Link} from "next/link"
import {HalfCircleSpinner} from 'react-epic-spinners'
import ScaleText from "react-scale-text";

class Notes extends Component{

  constructor(props){

    super(props)
    this.state = {

      popup:false,


    }

    this.openDropDownMenu = this.openDropDownMenu.bind(this)
    this.openEditor = this.openEditor.bind(this)

  }

  componentDidMount(){


    if(this.props.noteUnmounted === 'resolved' || 'initial'){    


      this.props.notebookMounted(this.props.notebook_id )
      this.props.changeNoteStatus('initial')


    }


  }

  componentDidUpdate(prevProps){

    if(this.props.noteUnmounted === 'resolved' ){

      this.props.notebookMounted(this.props.notebook_id)
      this.props.changeNoteStatus('initial')

    }

    if(this.props.notebook_id !== prevProps.notebookValue._id){

      console.log("update",this.props.notebookValue.notes)
      this.props.notebookMounted(this.props.notebook_id)
    }
  }



  openDropDownMenu(){

    this.setState( state => {

      return {popup:!state.popup}
    })
  }

  openEditor(e,item){

    this.props.openNotebooksEditor(e , this.props.notebookValue._id , item)
  }

  

  render(){

    const {styles} = this.props
    const { showSidebar } = styles;
    const contentStyle = {

      display:this.props.notebookFetched ? "block" :"flex",
      paddingTop: showSidebar ? styles.topBarHeight + 10 : styles.topBarHeight + 20,
      paddingBottom: showSidebar ? 20 : styles.footerMenuHeight + 20,
      paddingLeft: showSidebar ? styles.sidebarWidth + 15 : 40,
      transition:styles.transition,
      height:"100%",
      width:"99%",
      alignContent:"none",
      alignItems:this.props.notebookFetched ? "none" : "center",
      justifyContent:this.props.notebookFetched ? "none" : "center"
    }

    const {notebookValue , noteStatus} = this.props
    
    return (
      
      <div  style={contentStyle}>
        {
        this.props.notebookFetched ?
          <Fragment>
            <Header as="h2" color="grey" style={{ display:"flex" , justifyContent:"flex-start" }}><span>{notebookValue.notebook_title}</span></Header>
            <Divider/>
            <div className="auto-grid">
            
              {notebookValue.notes.map(note => {

                return(

                  <span key={note._id} className="flip-in-diag-2-br item">
                    <Card style={{cursor:"text"}}>
                      <Link 
                        onClick={(e) => this.openEditor(e,
                        { _id:notebookValue._id , notebook_title:notebookValue.notebook_title , note:{ _id:note._id , note_title:note.note_title } })} 
                        id={note._id}
                        href={`/notebooks/${this.props.notebookValue._id}/notes/${note._id}/show`}
                        style={{color:"black"}}
                      >    

                        <div dangerouslySetInnerHTML={{__html:note.blocks }} style={{fontSize:"0.3vw" , height:"25vh"}} className="truncate"></div>
                      </Link>
                      <Card.Content >
                        <Card.Header>{note.note_title}</Card.Header>
                          <Card.Meta style={{display:"flex", flexDirection:"row" , width:"100%" }}>
                            <span className='date' style={{alignSelf:"center" , width:"80%"}}>created in 2015</span>
                            <span style={{alignSelf:"center" , width:"20%"}}>
                              <Popup wide trigger={<Button circular style={{boxShadow:"none"}} icon="ellipsis vertical" basic size="big"/>} position="bottom left" on='click'>
                                <div style={{display:"flex", flexDirection:"column" , justifyContent:"flex-start"}}>
                                  <span style={{color:"grey"}}>Move Note</span>
                                  <Divider style={{width:"100%"}}/>
                                  <span style={{color:"#ed5249"}}> Delete Note</span>
                                  <Divider style={{width:"100%"}}/>
                                  <span>Rename Note</span>
                                </div>
                              </Popup>
                            </span>
                          </Card.Meta>
                      </Card.Content>
                    </Card>
                    

                  </span>
                )
              })}


            </div>
          </Fragment>
          :

          <HalfCircleSpinner color="orange"/>
        }
      </div>
    );
  }
}

export default Notes;
