// var PropTypes = require('prop-types');
import { FaBold, FaItalic, FaUnderline, FaAlignLeft, FaAlignRight, FaAlignCenter } from "react-icons/fa";
import Button from "../Button/Button";
import { includes, findLast } from "lodash";
import { toLC } from "../../Helpers/string";

const ENTER = 13;

const TextArea = (props) => {
    const findParent = (node) => {
        var loop = true;
        while(loop){
            if(node && node.nodeName === 'P'){
                return node;
            } else if (node && node.parentElement){
                node = node.parentElement;
            } else {
                loop = false;
            }
        }
    }

    const createNewParagraph = (e) => {
        e.preventDefault();
        let range = document.createRange(),
            sel = window.getSelection(),
            anchor = sel.anchorNode,
            editor = document.querySelectorAll('.text-editor')[0],
            node = findParent(anchor),
            newNode = document.createElement('p');
            
            newNode.className ='sw-full h-4 mt-3 mb-2';

        if(node && node.nextSibling){
            node.parentNode.insertBefore(newNode, node.nextSibling);
        } else {
            editor.appendChild(newNode);
        }

        range.setStart(newNode, 0);
        range.collapse(true);

        sel.removeAllRanges();
        sel.addRange(range);
    }

    const handleChange = (e) => {
        let { which} = e;
        if(which === ENTER){
            createNewParagraph(e);
        }
    }

    return (
        <div className="p-2 h-[100px] w-[400px]">
            <TextMenu/>
            <div 
                className="text-editor border focus:outline-blue-500 w-full min-h-[200px] p-2"
                contentEditable="true"
                role="textbox"
                spellCheck="false"
                onKeyDown={handleChange}
            >
            </div>
        </div>
    )
}

// TextField.propTypes = {
//     label: PropTypes.string
// }

// TextField.defaultProps = {
//     label: ''
// }

const TextMenu = (props) => {
    return (
        <div className="w-full border border-b-0 p-2 bg-gray-100">
            <Button className="capitalize text-black shadow-xs text-sm px-3 py-2 font-semibold hover:bg-gray-300 ml-2" Icon={FaBold} ariaText='bold'/>
            <Button className="capitalize text-black shadow-xs text-sm px-3 py-2 font-semibold hover:bg-gray-300" Icon={FaItalic} ariaText='italize'/>
            <Button className="capitalize text-black shadow-xs text-sm px-3 py-2 font-semibold hover:bg-gray-300" Icon={FaUnderline} ariaText='underline'/>
            <Button className="capitalize text-black shadow-xs text-sm px-3 py-2 font-semibold hover:bg-gray-300" Icon={FaAlignLeft} ariaText='align left'/>
            <Button className="capitalize text-black shadow-xs text-sm px-3 py-2 font-semibold hover:bg-gray-300" Icon={FaAlignCenter} ariaText='align center'/>
            <Button className="capitalize text-black shadow-xs text-sm px-3 py-2 font-semibold hover:bg-gray-300" Icon={FaAlignRight} ariaText='align right'/>

        </div>
    )
}

export default TextArea;