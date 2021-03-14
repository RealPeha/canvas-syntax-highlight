const getNodeText = node => {
	if (node.nodeName === '#text') {
		return node.value
	}

	const textNode = node.childNodes.find(node => node.nodeName === '#text')

	return textNode ? textNode.value : ''
}

module.exports = getNodeText
