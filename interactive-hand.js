function updateText(id) {
    // Hide all content sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.style.display = 'none'
    })

    // Check for callout
    const callout = document.getElementById('hand-callout')
    if (callout) {
        callout.style.display = 'block'
    }

    // Check if any region is highlighted
    if (document.querySelector("#svg_hands g g.highlight")) {
        const section = document.getElementById(`section-${id}`)
        if (section) {
            section.style.display = 'block'
        }
    } else {
        // Show table of contents
        const toc = document.getElementById('table-of-contents')
        if (toc) {
            toc.style.display = 'block'
        }
    }
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