import React from 'react';

function InputBox({ label, placeholder, name, value, onChange }) { // Added name, value, and onChange props
    return (
        <div>
            <div className='text-sm font-medium text-left py-1'>
                {label}
            </div>
            <input 
                placeholder={placeholder} 
                className='w-full px-2 py-1 border rounded border-slate-200'
                name={name} // Added name attribute
                id={name}   // Added id attribute (best practice to match with label's htmlFor)
                value={value} // Added value prop to control the input (optional)
                onChange={onChange} // Added onChange prop to handle input changes
            />
        </div>
    );
}

export default InputBox;
