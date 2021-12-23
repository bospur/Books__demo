import React, {useState, useEffect} from 'react';
import {v4 as uuidv4} from 'uuid';
import './MyBooks.css';
import image from './img/1.jpg'

function Mybooks() {
    const [author, setAuthor] = useState('')
    const [title, setTitle] = useState('')
    const [cover, setCover] = useState('')
    const [books, setBooks] = useState(
        JSON.parse(localStorage.getItem('books')) || []
    )

    useEffect(() => {
        localStorage.setItem('books', JSON.stringify(books))
    }, [books])
    
    function newItem() {
        if (author.trim() !== '' && title.trim() !== '') {
            const newBook = {
                id: uuidv4(),
                author,
                title,
                cover
            };
            setBooks((books) => [...books, newBook]);
            setTitle('');
            setAuthor('');
            setCover('')
        } else {
            alert('Заполните поля ...');
            setTitle('');
            setAuthor('');
            setCover('')
        }
    }

    function getBase64Image(img) {
        const canvas = document.createElement("canvas");
        canvas.width = img.width ;
        canvas.height = img.height;
    
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
    
        const dataURL = canvas.toDataURL("image/png");
    
        return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
    }

    const imageLook = (e) => {
        const imageId = e.target.value
        const imageCover = document.getElementById(`${imageId}`)
        const base64Cover = getBase64Image(imageCover)
        setCover(base64Cover)
    } 

const deleteBook = (id) => {
    setBooks([...books].filter(item => item.id !== id ))
}
      
    return (
        <div className='wrapper'>
           <div className='creation-field'>
                <input value={author} type='text' placeholder='Author'
                className='info__input'
                onChange={(e) => setAuthor(e.target.value)}></input>

                <input value={title} type='text' placeholder='Title'
                className='info__input' 
                onChange={(e) => setTitle(e.target.value)}></input>

                <div className='creation-field__cover'>
                   <div className='cover_row'>
                       <input className='radio' type='radio'
                       value='1' name='cover'
                       onChange={imageLook}></input>
                       <img id='1' src={image} alt='cover' className='cover' />
                   </div>
                   <div className='cover_row'>
                       <input className='radio' type='radio'
                       value='2' name='cover'
                       onChange={imageLook}></input>
                       <img id='2' src={image} alt='cover' className='cover' />
                   </div>
                   <div className='cover_row'>
                       <input className='radio' type='radio'
                       value='3' name='cover'
                       onChange={imageLook}></input>
                       <img id='3' src={image} alt='cover' className='cover'  />
                   </div>
                   <div className='cover_row'>
                       <input className='radio' type='radio'
                       value='4' name='cover'
                       onChange={imageLook}></input>
                       <img id='4' src={image} alt='cover' className='cover' />
                   </div>
                </div>
                <button onClick={newItem}>Create Book</button>
           </div>
           <div className='Mybooks-field'>
                <ul className='Mybooks-field__list'>
                    {
                        books.map((item,index) => 
                            <li key={index} className='Mybooks-field__item'>
                                <div className='MyBooks-fiels__book book'>
                                    <img src={`data:image/png;base64,${item.cover}`} alt='cover' className='book__cover'/>
                                    <h2 className='book__title'>{item.author}</h2>
                                    <p className='book__text'>{item.title}</p>
                                    <button className='book__delete'
                                    onClick={() => deleteBook(item.id)}
                                    >Удалить книгу</button>
                                </div>
                            </li>
                        )
                    }
                </ul>
           </div>

        </div>
    )
}

export default Mybooks