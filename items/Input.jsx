import { useState } from 'react';
import Visible from './visibility.jsx';
import VisibleOff from './visibility-off.jsx';

const Input = ({ name, onChange, value, type, label, disabled, required }) => {
    const [showPassword, setShow] = useState(false);
    return (<div className="rfl_form-group__input">
        <input
            type={showPassword ? 'text' : type}
            name={name}
            placeholder={label}
            disabled={disabled}
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            className={(required && !value) ? 'rfl_error' : ''}
        />
        {type === 'password' && (
            <span className="rfl_form-group__input_icon" onClick={() => setShow(pre => !pre)}>
                {showPassword ? <Visible size="20" /> : <VisibleOff size="20" />}
            </span>
        )}
    </div>)
};

export default Input;