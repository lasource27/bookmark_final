import { useState, useEffect } from 'react'

const Editbookmark = ({edit_id, bookmark_concerned, update_bookmark, tags, folders, close_edit}) => {

    useEffect(() => {
        setBookmark_title(bookmark_concerned.title);
        setBookmark_description(bookmark_concerned.description);
        setBookmark_folder(bookmark_concerned.folder);
        setBookmark_tag(bookmark_concerned.tag);
        
    }, [edit_id])

    const [bookmark_title, setBookmark_title] = useState(bookmark_concerned.title)
    const [bookmark_description, setBookmark_description] = useState(bookmark_concerned.description)
    const [bookmark_folder, setBookmark_folder] = useState(bookmark_concerned.folder)
    const [bookmark_tag, setBookmark_tag] = useState(bookmark_concerned.tag)

    const onSubmit = (e) => {
        e.preventDefault()
        update_bookmark(bookmark_title,bookmark_description,bookmark_folder,bookmark_tag)
        console.log(bookmark_concerned.tag)
        console.log(bookmark_concerned.folder)
        console.log(bookmark_folder)
    }

   
   
    return (
        <div className="edit_form">
            <div className="xmark" onClick={close_edit}>✕</div>
            <p>- Edit Bookmark -</p>
            <form className="row_name_sub" onSubmit={onSubmit}>
                <div className="form_control">
                     <label>Folder</label>
                    <select value={bookmark_folder} onChange={(e) => {setBookmark_folder((e.target.value))}}>
                        <option value="" disabled selected hidden>Please select folder</option>
                        {folders.map(folder => <option key={folder.id} value={folder.id}>{folder.name}</option>)}
                    </select>
                </div>
                <div className="form_control">
                    <label>Tag</label>
                    <select value={bookmark_tag} onChange={(e) =>  {setBookmark_tag(Array.from(e.target.selectedOptions, option => option.value))}} multiple>
                        {tags.map(tag => <option key={tag.id} value={tag.id}>{tag.name}</option>)}
                    </select>
                </div>
                <div className="form_control">
                    <label>Bookmark Title</label>
                    <input type="text" value={bookmark_title} onChange={(e) => {setBookmark_title(e.target.value)}} className="new_input"/>
                </div>
                <div className="form_control">
                    <label>Bookmark Description</label>
                    <input type="text" value={bookmark_description} onChange={(e) => {setBookmark_description(e.target.value)}} className="new_input"/>
                </div>
                
                <input type="submit" value="Update Bookmark" className="button_control"/>

                
            </form>
        </div>
    )
}

export default Editbookmark
