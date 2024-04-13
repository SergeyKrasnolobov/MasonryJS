export class Masonry {
  static activeClass = "masonry--active";

  constructor(hostNode, options = {}) {
    this.parentNode = hostNode;
    this.childrenNodes = [...this.parentNode.children];

    this.options = new Map(
      Object.entries({
        0: {
          gap: 20,
          columns: 3,
        },
        ...options,
      })
    );

    this.resize();
    this.upadateParams();
    this.parentNode.classList.add(Masonry.activeClass);
  }

  /**
   * Set main params for the masonry container: gap, columns, childWidth
   * @return {void}
   */
  upadateParams = () => {
    const containerWidth = this.parentNode.offsetWidth;
    this.updateOptions(containerWidth);
    this.updateChildWidth();
    this.updateContainerHeight();
    this.upadatePosition(this.options.get("itemWidth"));
  };

  /**
   * Set new options after resize event or after first open
   * @param {string} containerWidth - container width
   * @return {void}
   */

  updateOptions = (containerWidth) => {
    let availableWidth = 0;
    for (let optionKey of this.options.keys()) {
      if (Number(optionKey) <= containerWidth) {
        availableWidth = optionKey; //[0, 700, 1000, ...]
      }
    }

    this.options.set("currentGap", this.options.get(availableWidth).gap);
    this.options.set(
      "currentColumns",
      this.options.get(availableWidth).columns
    );

    this.getChildItemWidth(containerWidth);
  };

  /**
   * Set child max width
   * @return {void}
   */
  updateChildWidth = () => {
    this.childrenNodes.forEach((node) => {
      node.style.width = `${this.options.get("itemWidth")}px`;
    });
  };

  /**
   * Set container max height
   * @return {void}
   */
  updateContainerHeight = () => {
    const heightColumns = new Array(this.options.get("currentColumns")).fill(0);
    this.childrenNodes.forEach((child, i) => {
      heightColumns[i % this.options.get("currentColumns")] +=
        child.offsetHeight + this.options.get("currentGap");
    });
    const maxHeight = Math.min(...heightColumns);

    this.parentNode.style.height = `${
      maxHeight - this.options.get("currentGap")
    }px`;
  };

  /**
   * Set child's position from initial top, left
   * @param {string} itemWidth - child width
   * @return {void}
   */
  upadatePosition = (itemWidth) => {
    const heightColumns = new Array(this.options.get("currentColumns")).fill(0); //[0, 0, 0]

    this.childrenNodes.forEach((child, i) => {
      const indexColumn = i % this.options.get("currentColumns");
      const left = indexColumn * (itemWidth + this.options.get("currentGap"));
      const top = heightColumns[indexColumn];
      heightColumns[indexColumn] +=
        child.offsetHeight + this.options.get("currentGap");
      child.style.transform = `translate(${left}px, ${top}px)`; //[0 + childHeight, 0 + childHeight, 0 + childHeight]
    });
  };

  /**
   * Get child item width
   * @param {string} containerWidth - container width
   * @return {void}
   */
  getChildItemWidth = (containerWidth) => {
    const width =
      (containerWidth -
        this.options.get("currentGap") *
          (this.options.get("currentColumns") - 1)) /
      this.options.get("currentColumns");
    this.options.set("itemWidth", width);
  };

  resize = () => {
    window.addEventListener("resize", this.debounce(this.upadateParams));
  };

  debounce = (func, time = 100) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(func.apply(this, args), time);
    };
  };
}
