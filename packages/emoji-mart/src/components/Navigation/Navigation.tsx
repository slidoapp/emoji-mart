// @ts-nocheck
import { PureComponent, createRef } from 'preact/compat'
import { Data, I18n } from '../../config'
import Icons from '../../icons'

const THEME_ICONS = {
  light: 'outline',
  dark: 'solid',
}

export default class Navigation extends PureComponent {
  constructor() {
    super()

    this.categories = Data.categories.filter((category) => {
      return !category.target
    })

    this.tabListRef = createRef<HTMLElement>()

    this.state = {
      categoryId: this.categories[0].id,
    }
  }

  handleKeyDown = (e: KeyboardEvent) => {
    // Escape should still propagate up since it can be used in a dialog
    if (e.key !== 'Escape') {
      e.stopImmediatePropagation()
    }

    switch (e.key) {
      case 'ArrowLeft':
        this.navigate(-1)
        break

      case 'ArrowRight':
        this.navigate(1)
        break
    }
  }

  navigate(delta: 1 | -1) {
    const categoryIndex = this.categories.findIndex(
      (c) => c.id === this.state.categoryId,
    )
    const nextIndex =
      (categoryIndex + delta + this.categories.length) % this.categories.length
    const nextCategory = this.categories[nextIndex]

    this.setState({ categoryId: nextCategory.id })
    this.tabListRef.current.children[nextIndex].focus()
    this.props.onClick({ category: nextCategory, i: nextIndex })
  }

  renderIcon(category) {
    const { icon } = category

    if (icon) {
      if (icon.svg) {
        return (
          <span
            class="flex"
            dangerouslySetInnerHTML={{ __html: icon.svg }}
          ></span>
        )
      }

      if (icon.src) {
        return <img src={icon.src} />
      }
    }

    const categoryIcons =
      Icons.categories[category.id] || Icons.categories.custom

    const style =
      this.props.icons == 'auto'
        ? THEME_ICONS[this.props.theme]
        : this.props.icons

    return categoryIcons[style] || categoryIcons
  }

  render() {
    let selectedCategoryIndex = null

    return (
      <nav
        id="nav"
        class="padding"
        data-position={this.props.position}
        dir={this.props.dir}
        onKeyDown={this.handleKeyDown}
      >
        <div class="flex relative" role="tablist" ref={this.tabListRef}>
          {this.categories.map((category, i) => {
            const title = category.name || I18n.categories[category.id]
            const selected =
              !this.props.unfocused && category.id == this.state.categoryId

            if (selected) {
              selectedCategoryIndex = i
            }

            return (
              <button
                aria-label={title}
                aria-selected={selected ? 'true' : 'false'}
                title={title}
                type="button"
                class="flex flex-grow flex-center"
                role="tab"
                disabled={this.props.disabled}
                tabIndex={selected ? 0 : -1}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  this.props.onClick({ category, i })
                }}
              >
                {this.renderIcon(category)}
              </button>
            )
          })}

          <div
            class="bar"
            style={{
              width: `${100 / this.categories.length}%`,
              opacity: selectedCategoryIndex == null ? 0 : 1,
              transform:
                this.props.dir === 'rtl'
                  ? `scaleX(-1) translateX(${selectedCategoryIndex * 100}%)`
                  : `translateX(${selectedCategoryIndex * 100}%)`,
            }}
          ></div>
        </div>
      </nav>
    )
  }
}
