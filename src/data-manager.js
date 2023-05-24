import _ from 'lodash'

class DataManager {
  constructor () {
    this.dataset = _.range(7).map(() => _.range(0, 10).map((i) => this._createDatapoint(i)))
  }

  _createDatapoint (index) {
    return {
      x: index,
      y: _.random(1, 15)
    }
  }

  add () {
    this.dataset = this.dataset.map((group) => {
      return [...group, this._createDatapoint(group.length)]
    })

    return this.dataset
  }

  getLatest () {
    return this.dataset.map((group) => {
      return group.slice(group.length - 10)
    })
  }
}

export default DataManager
