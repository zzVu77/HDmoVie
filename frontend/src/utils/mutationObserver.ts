export function observeBodyChanges() {
  const body = document.body

  // Create a MutationObserver to watch for attribute and style changes on the body
  const observer = new MutationObserver((mutationsList) => {
    mutationsList.forEach((mutation) => {
      if (mutation.type === 'attributes') {
        // Change the margin only when attr data-scroll-locked set
        if (mutation.attributeName === 'data-scroll-locked') {
          ;(mutation.target as HTMLElement).style.setProperty('margin-right', '0px', 'important')
        }
      }
    })
  })

  // Start observing the body for attribute and style changes
  observer.observe(body, {
    attributes: true, // Watch for changes in attributes like data-scroll-locked
    attributeFilter: ['data-scroll-locked'], // Only watch specific attributes
    childList: false, // Don't watch for changes in child elements
    subtree: false, // Don't watch for changes in the entire subtree of the body
    characterData: false, // Ignore text content changes
  })

  return observer // Return the observer to disconnect it later
}
