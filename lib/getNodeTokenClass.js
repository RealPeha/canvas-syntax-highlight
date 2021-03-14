const getNodeTokenClass = node => {
	if (!node.attrs) {
		return ''
	}

	const classNames = node.attrs.find(attr => attr.name === 'class')

	return classNames && classNames.value
		? classNames.value
			.split(' ')
			.slice(1)
			.join(' ')
		: ''
}

module.exports = getNodeTokenClass
