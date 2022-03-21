import React from 'react'
import { useState, useEffect, useContext } from "react"
import { Link } from 'react-router-dom'
import Folders from '../component/Folders'
import Tags from '../component/Tags'
import Bookmarks from '../component/Bookmarks'
import Editbookmark from '../component/Editbookmark'
import Searchbar from "../component/Searchbar"
import Addbutton from "../component/Addbutton"
import Sortbutton from "../component/Sortbutton"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEllipsisH, faBookmark, faFolder, faTags, faUser, faFolderOpen, faAngleDoubleDown, faAngleDoubleUp, faHashtag, faUserTag, faThumbtack, faCalendarDay, faPencilAlt, faBookReader, faTrashAlt, faSearch, faStar, faPlus, faTrash, faLock, faEnvelope} from '@fortawesome/free-solid-svg-icons'
import { faFolder as faFolderRegular, faUser as faUserRegular} from '@fortawesome/free-regular-svg-icons'
import AuthContext from '../context/AuthContext'




library.add(faEllipsisH, faBookmark, faFolder, faTags, faUser, faFolderOpen, faAngleDoubleDown, faAngleDoubleUp, faFolderRegular, faHashtag, faUserTag, faThumbtack, faCalendarDay, faPencilAlt, faBookReader, faTrashAlt, faSearch, faStar, faPlus, faTrash, faLock, faEnvelope, faUserRegular)


const Homepage = () => {
    const [folders, setFolders] = useState([])
    const [tags, setTags] = useState([])
    const [bookmarks, setBookmarks] = useState([])
    const [showFolders, setShowFolders] = useState(false)
    const [showTags, setShowTags] = useState(false)
    const [titleBar, setTitleBar] = useState('All Bookmarks')
    const [folderIcon, setFolderIcon] = useState(false)
    const [tagIcon, setTagIcon] = useState(false)
    const [allbookmarkIcon, setAllbookmarkIcon] = useState(true)
    const [loader, setLoader] = useState(false)
    const [addbutton_submit, setAddbutton_submit] = useState(false)
    const [filtered_tag_bookmarks, setFiltered_tag_bookmarks] = useState([])
    const [show_new_tag, setShow_new_tag] = useState(false)
    const [show_new_folder, setShow_new_folder] = useState(false)
    const [edit_bookmark_toggle, setEdit_bookmark_toggle] = useState(false)
    const [edit_id, setEdit_id] = useState("")
    const [bookmark_concerned, setBookmark_concerned] = useState("")
  
    const [showDropdown, setShowDropdown] = useState(false)
    
    const {user} = useContext(AuthContext)
    const {authTokens, logoutUser} = useContext(AuthContext)
    
    // false not 'false'
    
  
    useEffect(() => {
      const foldersFromServer = async () => {
        const folders = await fetchFolders()
        setFolders(folders)
      };
      foldersFromServer();
  
  
      const tagsFromServer = async () => {
        const tags = await fetchTags()
        setTags(tags)
      };
      tagsFromServer();
  
      const bookmarksFromServer = async () => {
        const bookmarks = await fetchBookmarks()
        setBookmarks(bookmarks)
        setFiltered_tag_bookmarks(bookmarks)
      };
      bookmarksFromServer();
      
    }, [])
  
    const fetchFolders = async () => {
      const res = await fetch('http://127.0.0.1:8000/backend/folder-list',{
        method:'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + String(authTokens.access)
        }
      })
      const data = await res.json()
      if (res.status === 200){
        return data
      }else if(res.statusText === 'Unauthorized'){
        logoutUser()
      }

    }
  
    const fetchTags = async () => {
      const res = await fetch('http://127.0.0.1:8000/backend/tag-list',{
        method:'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + String(authTokens.access)
        }
      })
      const data = await res.json()
      if (res.status === 200){
        return data
      }else if(res.statusText === 'Unauthorized'){
        logoutUser()
      }
    }
  
    const fetchBookmarks = async () => {
      const res = await fetch('http://127.0.0.1:8000/backend/bookmark-list',{
        method:'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + String(authTokens.access)
        }
      })
      const data = await res.json()
      if (res.status === 200){
        return data
      }else if(res.statusText === 'Unauthorized'){
        logoutUser()
      }
     
      
      
    }
  
    const folderToggle = () => {
      setShowFolders(!showFolders)
    }
  
    const tagToggle = () => {
      setShowTags(!showTags)
    }
  
    const folder_bookmark = async (id) => {
      const res = await fetch(`http://127.0.0.1:8000/backend/folder-detail/${id}`,{
        method:'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + String(authTokens.access)
        }
      })
      const data = await res.json()
      if (res.status === 200){
        const all_bookmarks = await fetchBookmarks()
        console.log("all_bookmarks:", all_bookmarks, "data:", data["bookmarks"])
        setBookmarks(all_bookmarks.filter(bookmark => data["bookmarks"].includes(bookmark.id)))
        
        setTitleBar(data["folder_name"])
        setFolderIcon(true)
        setTagIcon(false)
        setAllbookmarkIcon(false)
      }else if(res.statusText === 'Unauthorized'){
        logoutUser()
      }     
    }
  
    const tag_bookmark = async (id) => {
      const res = await fetch(`http://127.0.0.1:8000/backend/tag-detail/${id}`,{
        method:'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + String(authTokens.access)
        }
      })
      
      const data = await res.json()
      if (res.status === 200){
        const all_bookmarks = await fetchBookmarks()
        setBookmarks(all_bookmarks.filter(bookmark => data["bookmarks"].includes(bookmark.id)))
        setTitleBar(data["tag_name"])
        setFolderIcon(false)
        setTagIcon(true)
        setAllbookmarkIcon(false)
      }else if(res.statusText === 'Unauthorized'){
        logoutUser()
      }
    }
  
    const show_all_bookmarks = async () => {
      const bookmarks = await fetchBookmarks()
      setBookmarks(bookmarks)
      setFiltered_tag_bookmarks(bookmarks)
      setTitleBar('All Bookmarks')
      setFolderIcon(false)
      setTagIcon(false)
      setAllbookmarkIcon(true)
    }
  
    const onDeletebookmark = async (id) => {
      const res = await fetch(`http://127.0.0.1:8000/backend/bookmark-delete/${id}`,{
        method:'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + String(authTokens.access)
        }
      })

      if (res.status === 200){
        const bookmarksFromServer = async () => {
          const bookmarks = await fetchBookmarks()
          setBookmarks(bookmarks)
        };
        bookmarksFromServer()
      }else if(res.statusText === 'Unauthorized'){
        logoutUser()
      }
        
    }
      
    const search_bookmark = async (search_input) => {
      const all_bookmarks = await fetchBookmarks()
      setBookmarks(all_bookmarks.filter((bookmark) => bookmark.title.toLowerCase().includes(search_input.toLowerCase())))
      
    }
  

    const tag_filter = async(id) => {
      const res = await fetch(`http://127.0.0.1:8000/backend/tag-detail/${id}`,{
        method:'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + String(authTokens.access)
        }
      })
      
      const data = await res.json()
      if (res.status === 200){
        
        setBookmarks(filtered_tag_bookmarks.filter(bookmark => data["bookmarks"].includes(bookmark.id)))
        setFiltered_tag_bookmarks(filtered_tag_bookmarks.filter(bookmark => data["bookmarks"].includes(bookmark.id)))
        // setTitleBar(data["tag_name"])
        // setFolderIcon(false)
        // setTagIcon(true)
        // setAllbookmarkIcon(false)
      }else if(res.statusText === 'Unauthorized'){
        logoutUser()
      }

    }

    const add_task = async (page_url,folder,tag) => {
        // fetch(`http://127.0.0.1:8000/backend/bookmark-create/?page_url=${page_url}`, {
        //     method: 'POST',
        //     headers: {
        //         'Content-type': 'application/json',
        //     },
        // }).then(x => x.json()).then(json => {
        //     console.log(json);
        // })
        setAddbutton_submit(true)
        setLoader(true)

        const res = await fetch('http://127.0.0.1:8000/backend/bookmark-create/', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            },
            body: JSON.stringify({'page_url':page_url,'folder':folder,'tag':tag})
        })
       
      
        const data = await res.json()
        
        console.log(data,res.status)
        

        if (data.error === "error") {
          setBookmarks(bookmarks)
          setAddbutton_submit(false)
          setLoader(false)
          setShowDropdown(false)
          alert("Error when loading the bookmark, please try another one")
        } else if(res.statusText === 'Unauthorized'){
          logoutUser()
          
        }else {
            const bookmarks = await fetchBookmarks()
            setBookmarks(bookmarks)
            setAddbutton_submit(false)
            setLoader(false)
            setShowDropdown(false)
        }
    }

    const update_bookmark = async (bookmark_title,bookmark_description,bookmark_folder,bookmark_tag) => {
      const res = await fetch(`http://127.0.0.1:8000/backend/bookmark-update/${edit_id}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            },
            body: JSON.stringify({'title':bookmark_title,'description':bookmark_description,'folder':bookmark_folder,'tag':bookmark_tag})
        })
        
      const data = await res.json()

      console.log(data)
      
      if (data.error === "error") {
        alert("Bookmark update failed, please try again")
      }else if(res.statusText === 'Unauthorized'){
        logoutUser()
      }else {
        const bookmarks = await fetchBookmarks()
        setBookmarks(bookmarks)
        setAllbookmarkIcon(true)
        setTitleBar("All Bookmarks")
        alert("Bookmark updated")
        setEdit_bookmark_toggle(false)
      }
    }
  

    const create_tag_toggle = () => {
      setShow_new_tag(!show_new_tag)
    }

    const create_folder_toggle = () => {
      setShow_new_folder(!show_new_folder)
    }

    const create_tag = async(new_tag) => {
      console.log("create tag")
      setShow_new_tag(false)

      const res = await fetch('http://127.0.0.1:8000/backend/tag-create/', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + String(authTokens.access)
        },
        body: JSON.stringify({'name':new_tag})
      })
   

      const data = await res.json()
  
      if (res.status === 200){
        const tags = await fetchTags()
        setTags(tags)
      }else if(res.statusText === 'Unauthorized'){
        logoutUser()
      }     
    }

    const create_folder = async(new_folder) => {
     
      setShow_new_folder(false)

      const res = await fetch('http://127.0.0.1:8000/backend/folder-create/', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + String(authTokens.access)
        },
        body: JSON.stringify({'name':new_folder})
      })
   

      const data = await res.json()
  
      if (res.status === 200){
        const folders = await fetchFolders()
        setFolders(folders)
      }else if(res.statusText === 'Unauthorized'){
        logoutUser()
      }     
    }

    const update_tag = async (id, tag_name) => {
      console.log("update tag")
      setShow_new_tag(false)

      const res = await fetch(`http://127.0.0.1:8000/backend/tag-update/${id}`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + String(authTokens.access)
        },
        body: JSON.stringify({'name':tag_name})
      })
   

      const data = await res.json()
      console.log(data)
  
      if (res.status === 200){
        const tags = await fetchTags()
        setTags(tags)
      }else if(res.statusText === 'Unauthorized'){
        logoutUser()
      }     
    }

    const update_folder = async (id, folder_name) => {
      console.log("update folder")
      setShow_new_folder(false)

      const res = await fetch(`http://127.0.0.1:8000/backend/folder-update/${id}`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + String(authTokens.access)
        },
        body: JSON.stringify({'name':folder_name})
      })
   

      const data = await res.json()
      console.log(data)
  
      if (res.status === 200){
        const folders = await fetchFolders()
        setFolders(folders)
      }else if(res.statusText === 'Unauthorized'){
        logoutUser()
      }     
    }

    const onDeletetag = async (id) => {
      const res = await fetch(`http://127.0.0.1:8000/backend/tag-delete/${id}`,{
        method:'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + String(authTokens.access)
        }
      })

      if (res.status === 200){
        const tags = await fetchTags()
        setTags(tags)
      }else if(res.statusText === 'Unauthorized'){
        logoutUser()
      }
        
    }

    const onDeletefolder = async (id) => {
      const res = await fetch(`http://127.0.0.1:8000/backend/folder-delete/${id}`,{
        method:'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + String(authTokens.access)
        }
      })

      if (res.status === 200){
        const folders = await fetchFolders()
        setFolders(folders)
      }else if(res.statusText === 'Unauthorized'){
        logoutUser()
      }
        
    }

    const handle_hidedropdown = () => {
      setShowDropdown(false)
    }
      
  
    const  toggle_showdropdown = () => {
      
      setShowDropdown(!showDropdown)
      // toggle action is passed up from addbutton component to APP component, and showDropdown state is passed down from APP to addbutton
    }
       
    const edit_bookmark = (id, bookmark) => {
      if (edit_bookmark_toggle === false) {
        setEdit_bookmark_toggle(!edit_bookmark_toggle)

      }else if ((edit_bookmark_toggle === true)  && (edit_id === id)) {
        setEdit_bookmark_toggle(!edit_bookmark_toggle)
      }else {
        
      }

      setEdit_id(id)
      setBookmark_concerned(bookmark)
      console.log(id, bookmark_concerned)
     
    }

    const close_edit = () => {
      setEdit_bookmark_toggle(false)
    }
  
    return (
        <div className="container">
            {/* ---NAVIGATION--- */}
            <section className="navigation">
                {/* userheader */}
                <div className="userHeader">
                    <div className="userName">
                        <div className="link_control header_font_size">              
                            <FontAwesomeIcon icon={["fas", "user"]} className="decor_icons"/>
                            <div style={{ textDecoration: 'none', color: "rgb(54, 53, 53)"}}>Hi, {user.username}</div>
                                        
                        </div>
                    </div>
                    <div className="headerEllipsis">
                        <div className="row_name header_font_size" onClick={logoutUser}>
                          <p>Log Out</p>
                        {/* <FontAwesomeIcon icon={["fas", "ellipsis-h"]} className="link_icons"/> */}
                        </div>
                    </div>
                </div>
                {/* all_bookmarks */}
                <div className="all_bookmarks" >
                    <div className="row_control" onClick={show_all_bookmarks}>
                        <div className="row_name">
                            <FontAwesomeIcon icon="bookmark" className="decor_icons"/>
                            <h5>All bookmarks</h5>
                        </div> 
                    </div>        
                </div>
                {/* folders */}
                <div className="folders">
                    <div className="row_wrap" >
                        <div className="row_control">
                            <div className="row_name" onClick={folderToggle}>
                                {showFolders ? <FontAwesomeIcon icon={["fas", "folder-open"]} className="decor_icons"/> : <FontAwesomeIcon icon={["fas", "folder"]} className="decor_icons"/>}
                                <h5>Folders</h5>
                            </div>
                            <div className="icon_right" onClick={create_folder_toggle}>
                                <div className="link_control">
                                    {showFolders ? <FontAwesomeIcon icon={["fas", "plus"]} className="link_icons" /> : <FontAwesomeIcon icon={["fas", "angle-double-down"]} className="link_icons"/> }
                                </div>
                            </div>
                        </div>
                    </div>
                    {showFolders ? <Folders folders={folders} folder_bookmark={folder_bookmark} create_folder={create_folder} show_new_folder={show_new_folder} update_folder={update_folder} onDeletefolder={onDeletefolder}/> : ""}
                </div>
                {/* tags */}
                <div className="tags">
                    <div className="row_wrap">
                        <div className="row_control">
                            <div className="row_name" onClick={tagToggle}>
                                {showTags ? <FontAwesomeIcon icon={["fas", "user-tag"]} className="decor_icons"/> : <FontAwesomeIcon icon={["fas", "tags"]} className="decor_icons"/>}
                                <h5>Tags</h5>
                            </div>
                            <div className="icon_right" onClick={create_tag_toggle}>
                                <div className="link_control">
                                    {showTags ? <FontAwesomeIcon icon={["fas", "plus"]} className="link_icons" /> : <FontAwesomeIcon icon={["fas", "angle-double-down"]} className="link_icons"/>}
                                </div>
                            </div>
                        </div>
                    </div>
                    {showTags ? <Tags tags={tags} tag_bookmark={tag_bookmark} create_tag={create_tag} show_new_tag={show_new_tag} update_tag={update_tag} onDeletetag={onDeletetag}/> : ""}
                </div>        
            </section>

            {/* ---SHOWCASE--- */}
            <div className="main_part">
              <section className="showcase">
                  {/* functionbar */}
                  <div className="function_bar">
                      <Searchbar search_bookmark={search_bookmark} />
                      <div className="function_button">
                          <Addbutton folders={folders} tags={tags} add_task={add_task} addbutton_submit={addbutton_submit} showDropdown={showDropdown} toggle_showdropdown={toggle_showdropdown} handle_hidedropdown={handle_hidedropdown}/>
                          <Sortbutton />
                      </div>
                  </div>
                  {/* main */}
                  <div className="main">
                      <div className="title_bar">
                          {allbookmarkIcon ? <FontAwesomeIcon icon="bookmark" className="decor_icons"/> : folderIcon ? <FontAwesomeIcon icon={["far", "folder"]} className="decor_icons"/> : <FontAwesomeIcon icon={["fas", "hashtag"]} className="decor_icons"/>}<h2>{titleBar}</h2>
                      </div>
                      <div className="bookmark_area">
                          <Bookmarks bookmarks={bookmarks} loader={loader} onDeletebookmark={onDeletebookmark} tags={tags} tag_filter={tag_filter} edit_bookmark={edit_bookmark}/>
                      </div>
                  </div>
              </section>
              {edit_bookmark_toggle ?
              <section className="edit_showcase">
                <Editbookmark edit_id={edit_id} bookmark_concerned={bookmark_concerned} update_bookmark={update_bookmark} tags={tags} folders={folders} close_edit={close_edit}/>
              </section>
              :""
              }
            </div>
        </div>
    )
}

export default Homepage
