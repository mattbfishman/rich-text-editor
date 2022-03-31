// var PropTypes = require('prop-types');
import { FaBold, FaItalic, FaUnderline, FaAlignLeft, FaAlignRight, FaAlignCenter } from "react-icons/fa";
import Button from "../Button/Button";
import { includes, findLast, forEach } from "lodash";

const ENTER = 13,
      BOLD  = 'bold';

const TextArea = (props) => {
    const nextNode = (node) => {
        if (node.hasChildNodes()) {
            return node.firstChild;
        } else {
            while (node && !node.nextSibling) {
                node = node.parentNode;
            }
            if (!node) {
                return null;
            }
            return node.nextSibling;
        }
    }
    
    const getRangeSelectedNodes = (range) => {
        var node = range.startContainer;
        var endNode = range.endContainer;
    
        // Special case for a range that is contained within a single node
        if (node == endNode) {
            return [node];
        }
    
        // Iterate nodes until we hit the end container
        var rangeNodes = [];
        while (node && node != endNode) {
            rangeNodes.push( node = nextNode(node) );
        }
    
        // Add partially selected nodes at the start of the range
        node = range.startContainer;
        while (node && node != range.commonAncestorContainer) {
            rangeNodes.unshift(node);
            node = node.parentNode;
        }
    
        return rangeNodes;
    }
    
    const getRangeElements = () => {
        if (window.getSelection) {
            var sel = window.getSelection();
            if (!sel.isCollapsed) {
                return getRangeSelectedNodes(sel.getRangeAt(0));
            }
        }
        return [];
    }

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
            
            newNode.innerHTML = '&nbsp;'

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

    const handleButtonClick = (e, type) => {
        e.preventDefault();
        var ele = getRangeElements();
        forEach(ele, function(element){
            if(element && element.nodeName !== 'P'){
                let bold = document.createElement('strong');
                let parent = element.parentNode;
                bold.appendChild(element);
                parent.appendChild(bold);
            }
        });
    }

    return (
        <div className="p-2 h-[100px] w-[400px]">
            <TextMenu onClick={handleButtonClick}/>
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
    let {onClick} = props;
    return (
        <div className="w-full border border-b-0 p-2 bg-gray-100">
            <Button className="capitalize text-black shadow-xs text-sm px-3 py-2 font-semibold hover:bg-gray-300 ml-2" Icon={FaBold} ariaText={BOLD} onClick={(e) => onClick(e, BOLD)}/>
            <Button className="capitalize text-black shadow-xs text-sm px-3 py-2 font-semibold hover:bg-gray-300" Icon={FaItalic} ariaText='italize'/>
            <Button className="capitalize text-black shadow-xs text-sm px-3 py-2 font-semibold hover:bg-gray-300" Icon={FaUnderline} ariaText='underline'/>
            <Button className="capitalize text-black shadow-xs text-sm px-3 py-2 font-semibold hover:bg-gray-300" Icon={FaAlignLeft} ariaText='align left'/>
            <Button className="capitalize text-black shadow-xs text-sm px-3 py-2 font-semibold hover:bg-gray-300" Icon={FaAlignCenter} ariaText='align center'/>
            <Button className="capitalize text-black shadow-xs text-sm px-3 py-2 font-semibold hover:bg-gray-300" Icon={FaAlignRight} ariaText='align right'/>

        </div>
    )
}

export default TextArea;