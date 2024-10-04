import React from 'react'
import "./Bookspage.css"
import book1 from "./assets/book1.jpg"
import book2 from "./assets/book2.jpg"
import book3 from "./assets/book3.jpg"
import book4 from "./assets/book4.jpg"
import book5 from "./assets/book5.jpg"

const Bookspage = () => {
  return (
    <div>
        <div className="bookspage">
            <div className="heading">BOOKS THAT WILL HELP YOU</div>
            <div className="para">Now, we know that the tips that have been given are not enough to tackle social phobia for those who are having a little higher level of social anxiety. That's why we are recommending that you read some of the following books and try to implement the exercises given in those books. We are sure these will help your anxiety and you will be able to enjoy life instead of worrying constantly. The impact of reading books can help you start changing your practices.</div>
            <div className="books-container">
                <div className="books">
                    <div className="sub-heading">
                        Overcome Social Anxiety Step-by-Step <br />by Thomas Richards
                    </div>
                    <img className='book-img' src={book1} alt="" />
                    <div className="para">This book written by Dr. Richards, a psychologist, will tell you a step-by-step plan to overcome your social anxiety. It is 306 page book which will help the reader to learn to think, believe, and feel rationally, instead of letting anxiety cripple your life.</div>
                </div>
                <div className="books">
                    <div className="sub-heading">
                        Living Fully with Shyness and Social Anxiety <br /> by Erika Hilliard
                    </div>
                    <img className='book-img' src={book2} alt="" />
                    <div className="para">Erika Hilliard goes in-depth in Living Fully With Shyness and Social Anxiety with a variety of topics in this book including blushing, eye contact, body language, shy bladder syndrome, preparing for stressful social situations, medication, and goal setting.</div>
                </div>
            </div>
            <div className="books-container">
                <div className="books">
                    <div className="sub-heading">
                    How to Be Yourself <br />by Ellen Hendriksen
                    </div>
                    <img className='book-img' src={book3} alt="" />
                    <div className="para">It can be hard to know how to “be yourself” if you have social anxiety—your natural tendencies to avoid social or performance situations or to shut down when you are in them may have clouded your ability to know who you even are. This book combines science with practical advice and stories about real people who have overcome social anxiety.</div>
                </div>
                <div className="books">
                    <div className="sub-heading">
                    The Social Skills Guidebook by Chris Macleod <br /> by chris macleod
                    </div>
                    <img className='book-img' src={book4} alt="" />
                    <div className="para">The Social Skills Guidebook gives you insights into your interpersonal struggles and behaviors, and offers hands-on advice for developing and improving your people skills. The author talks about how to talk to people, how to make friends, and most importantly how to do all of this without feeling cheesy or like you've “sold out” on who you are.</div>
                </div>
            </div>
            <div className="books-container">
                <div className="books">
                    <div className="sub-heading">
                    Getting Over Stage Fright by Janet Esposito <br /> by janet esposito
                    </div>
                    <img className='book-img' src={book5} alt="" />
                    <div className="para">In Getting Over Stage Fright, Janet offers a new, holistic approach to this age-old problem, sharing a wide array of principles and practices to help you create the physical, mental, and spiritual well-being you need to get beyond your speaking or performing fear. This book is especially helpful to those who have moderate to high levels of performance anxiety, though it can also help those who have a milder case of the jitters.</div>
                </div>
                <div className="books"></div>
            </div>
        </div>
    </div>
  )
}

export default Bookspage
