import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'

const Bookmark = ({bookmark,tag_filter,rTags,onDeletebookmark, edit_bookmark}) => {
    const [edit_bookmark_toggle, setEdit_bookmark_toggle] = useState(false)


    const onClick_edit = () => {
        edit_bookmark(bookmark.id, bookmark)
    }
    return (
        <div  className="card">            
            <div className="normal_card">
                <div className="preview_image">
                    <img src={bookmark.preview_image} alt=""></img>
                </div>

                <div className="preview_text">
                    <div className="bookmark_title">
                        <h5>{bookmark.title}</h5>
                    </div>
                    <div className="preview_description_wrap">
                        <div className="preview_description">
                            <p>{bookmark.description}</p>
                        </div>
                    </div>
                
                    <div className="text_footnote">
                        <div className="bookmark_domain">
                            <FontAwesomeIcon icon="thumbtack" className="icon_footnote"/>
                            <p>{bookmark.domain}</p>
                        </div>
                        <div className="date_created">
                            <FontAwesomeIcon icon="calendar-day" className="icon_footnote"/>
                            <p>{bookmark.date_created}</p>
                        </div>
                    </div>

                    <div className="tag_name">

                        {bookmark.tag.map(each => <a className="tag_name_element" onClick={() => tag_filter(each)}>#{rTags[each]}</a>)}                
                    </div>
                </div>

                <a className="hover_icons left" href={bookmark.page_url} target="_blank" rel="noreferrer">
                    <FontAwesomeIcon icon="book-reader"/>
                </a>
                <div className="hover_icons middle" onClick={onClick_edit}>
                    <FontAwesomeIcon icon="pencil-alt" />
                </div>
                <div className="hover_icons right" onClick={() => onDeletebookmark(bookmark.id)}>
                    <FontAwesomeIcon icon="trash-alt" />
                </div>
            </div>    
        </div>
    )
}

export default Bookmark
