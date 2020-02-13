import React , {Component} from "react"
// tinymce
import TinyMce from "./TinyMce"


class Editor extends Component{
    

  constructor(props){

    super(props)

    this.state = {


    }
  }
  componentDidMount(){



  }

  sidebarButton(e){



  }

  mobileKeyboardHandler(){

    
  }

  componentWillUnmount(){

  }
  render(){

    const {styles} = this.props
    const showSidebar = styles.showSidebar
    const contentStyle = {
      paddingTop: showSidebar ? styles.topBarHeight + 10 : styles.topBarHeight + 20,
      paddingRight: 20,
      paddingBottom: showSidebar ? 20 : styles.footerMenuHeight + 20,
      paddingLeft: showSidebar ? styles.sidebarWidth + 40 : 40,
      background:"white",
      transition:styles.transition,
      width:"100%",
      height:"100%"
    
    }
    return(

        <div style={contentStyle}>
          <TinyMce showSidebar={showSidebar} item={this.props.item} postNote={this.props.postNote} changeNoteStatus={this.props.changeNoteStatus}/>
        </div>
    )
  }
}

export default Editor

