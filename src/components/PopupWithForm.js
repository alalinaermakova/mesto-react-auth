import React from 'react';

function PopupWithForm(props) {
    return(
        <div className={`pop-up pop-up_${props.name} ${props.isOpen ? 'pop-up_opened' : false}`}>
                <div className="pop-up__content">
                    <button className="pop-up__button-close" type="button" onClick={props.onClose}></button>
                    <h2 className="pop-up__title">
                        {props.title}
                        </h2>
                    <form className={`pop-up__form pop-up__form_${props.formName}`} name="form" noValidate>
                        {props.children}
                        <button type="submit" className="pop-up__button-submit" onClick={props.onSubmit} >
                            {props.buttonTitle}
                            </button>
                    </form>
                </div>
            </div>
    )
}

export default PopupWithForm;