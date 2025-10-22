// Helper function to strip unwanted tags from content
function stripTags(content) {
    return content.replace(/\n/g, '').replace(/<p>/g, '').replace(/<\/p>/g, '')
}

function updateText(id) {
    const target = document.querySelector('.hand-pathways-content')
    let content = ''

    // Check for callout
    const callout = document.getElementById('hand-callout')
    if (callout) {
        content += `<div class="hand-callout">${stripTags(callout.innerHTML)}</div>`
    }

    // Check if any region is highlighted
    if (document.querySelector("#svg_hands g g.highlight")) {
        const template = document.getElementById(`t-${id}`)
        content += stripTags(template.innerHTML)
    } else {
        // Build table of contents
        content += '<p class="meta-item">Click on a shape or one of the text links below to see appropriate pathways here.</p>'
        content += '<ul>'
        
        const templates = document.querySelectorAll("script[type='text/template']")
        templates.forEach(template => {
            const parentId = template.id.substring(2) // Remove 't-' prefix
            const templateContent = template.innerHTML
            const tempDiv = document.createElement('div')
            tempDiv.innerHTML = templateContent
            
            const heading = tempDiv.querySelector('h4')
            const subheadings = Array.from(tempDiv.querySelectorAll('span'))
                .map(span => span.innerHTML)

            if (heading) {
                content += `<li class="hands-toc">
                    <a href="javascript:void(0)" onclick="textClickHandler('${parentId}')">${heading.innerHTML}</a>`
                
                if (subheadings.length > 0) {
                    content += `<div class="subheadings">${subheadings.join('<br>')}</div>`
                }
                
                content += '</li>'
            }
        })
        
        content += '</ul>'
    }

    target.innerHTML = content
}

function clickHandler(group) {
    const alreadyHighlighted = group.classList.contains("highlight")
    
    // Remove highlight from all groups
    document.querySelectorAll("#svg_hands g g").forEach(g => {
        g.classList.remove("highlight")
    })
    
    if (!alreadyHighlighted) {
        group.classList.add("highlight")
    }

    updateText(group.id)
}

function textClickHandler(groupId) {
    const group = document.getElementById(groupId)
    if (group) {
        clickHandler(group)
    }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {   
    const shapes = document.querySelectorAll("#svg_hands g g")
    shapes.forEach(shape => {
        try {
            shape.addEventListener('click', () => clickHandler(shape))
        } catch (err) {
            console.error(`Failed to add click handler to [${shape.id}]:`, err)
        }
    })

    updateText('init')
})