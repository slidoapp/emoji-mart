import React from 'react'
import PropTypes from 'prop-types'

import Skins from './skins'

export default class SkinsDot extends Skins {
  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  handleKeyDown(event) {
    // if either enter or space is pressed, then execute
    if (event.keyCode === 13 || event.keyCode === 32) {
      this.handleClick(event)
    }
  }

  render() {
    const { skin, i18n } = this.props
    const { opened } = this.state
    const skinToneNodes = []

    for (let skinTone = 1; skinTone <= 6; skinTone++) {
      const selected = skinTone === skin
      const visible = opened || selected
      skinToneNodes.push(
        <span
          key={`skin-tone-${skinTone}`}
          className={`emoji-mart-skin-swatch${selected ? ' selected' : ''}`}
        >
          <span
            onClick={this.handleClick}
            onKeyDown={this.handleKeyDown}
            role="button"
            tabIndex={visible ? '0' : ''}
            aria-hidden={!visible}
            aria-pressed={opened ? !!selected : ''}
            aria-haspopup={!!selected}
            aria-expanded={selected ? opened : ''}
            aria-label={i18n.skintones[skinTone]}
            title={i18n.skintones[skinTone]}
            data-skin={skinTone}
            className={`emoji-mart-skin emoji-mart-skin-tone-${skinTone}`}
          />
        </span>,
      )
    }

    return (
      <section
        className={`emoji-mart-skin-swatches${opened ? ' opened' : ''}`}
        aria-label={i18n.skintext}
      >
        {skinToneNodes}
      </section>
    )
  }
}

SkinsDot.propTypes /* remove-proptypes */ = {
  onChange: PropTypes.func,
  skin: PropTypes.number.isRequired,
  i18n: PropTypes.object,
}

SkinsDot.defaultProps = {
  onChange: () => {},
}
