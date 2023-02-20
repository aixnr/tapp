const fetchData = async () => {
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)
  const tableId = urlParams.get('id')

  const response = await fetch(`/data/table/${ tableId }.json`)
  const data = await response.json()
  return data.papers
}

const tableLength = async () => {
  const pubTable = await fetchData()
  const pubTableLength = pubTable.length

  const pubTableHTML = `
    This table contains <span style="color: DodgerBlue; border-bottom: 1px solid DodgerBlue">${ pubTableLength }</span> studies.
  `

  document.getElementById('table-length').innerHTML = pubTableHTML

}

const renderTable = async() => {
  // Read data and then sort
  pubTable = await fetchData()
  pubTable.sort((a, b) => {
    return a.year > b.year
  })

  largeTable = document.getElementById("large-table")

  let insertHTML = ''

  for (const [_, paper] of pubTable.entries()) {
    // Format the tags
    let tags = paper.tags.join(', ')

    // Format the pathogens
    let pathogen = ''
    if (paper['pathogen'].length == 0) {
      pathogen = '<span style="color: LightSteelBlue"><i>N/A</i></span>'
    } else {
      pathogen = paper['pathogen']
    }

    // Format the findings
    let findings = ''
    if (paper['findings'].length == 0) {
      findings = '<span style="color: LightSteelBlue"><i>Pending data insertion</i></span>'
    } else {
      findings = paper['findings']
    }

    // Select formatting if it is a review
    let organism = ''
    if (paper['organism'] == 'REVIEW') {
      organism = `
        <div style="margin-top: 4px;">
          <span style="color: MintCream; background-color: MediumVioletRed; 
                       padding: 2px; 
                       border: 1px solid MediumVioletRed; border-radius: 4px;">
            Review
          </span>
        </div>`
    } else {
      organism = `<div>${ paper['organism'] }</div>`
    }
  
    insertHTML += `
    <div class="large-table-data">
      <div class="title">
        <div>${ paper['firstAuthor'] } (${ paper['seniorAuthor'] })</div>
        <div>
          ${ paper['journal']}
          ( <a href="https://doi.org/${ paper['doi'] }" target="_blank">${ paper['year'] }</a> )
        </div>
      </div>
      <div>${ pathogen }</div>
      ${ organism }
      <div>${ paper['primaryApproaches'] }</div>
      <div class="data-main">
        <div class="title">${ paper['title'] }</div>
        <div class="findings">${ findings }</div>
        <div class="tags">${ tags }</div>
      </div>
    </div>
    `
  }
  
  // Insert data into DIV
  largeTable.innerHTML += insertHTML
}

// -----------------------------------------------------------------------------
// Execution layer
renderTable()
tableLength()
