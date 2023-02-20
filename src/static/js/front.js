const fetchData = async () => {
  const response = await fetch('/data/frontmatter.json')
  const data = await response.json()
  return data.frontmatter
}

const updateTappTable = async () => {
  let frontmatterData = await fetchData()

  let tappTable = document.getElementById('tapp-table')


  for (const [_, front] of frontmatterData.entries()) {
    let newListItem = document.createElement('li')
    newListItem.style.marginBlock = '12px'

    newListItem.innerHTML = `<a href="/table.html?id=${ front['sequence'] }" style="text-decoration: none">${ front['title'] }</a>`
    tappTable.appendChild(newListItem)
  }

}

// -----------------------------------------------------------------------------
// Execution layer
updateTappTable()
