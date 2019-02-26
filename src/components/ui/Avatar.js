import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Image } from 'react-native'
import cloudinary from 'cloudinary-core'

export default class Avatar extends React.Component {
  constructor(props) {
    super(props)
    const cl = new cloudinary.Cloudinary({cloud_name: 'walkertrekker', secure: true});
    const avatar = this.props.player.avatar ? { uri: cl.url(this.props.player.avatar) } : require('../../../assets/blankavatar.png')
    this.state = { avatar }
  }

  render() {
    return (
      <Image
        source={this.state.avatar}
        style={[styles.image, this.props.imageStyles]}
      />
    )
  }
}

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'black'
  },
})

Avatar.propTypes = {
  player: PropTypes.object.isRequired,
  imageStyles: PropTypes.object // use this to tweak image style from the parent component
}

Avatar.defaultProps = {
  imageStyles: {}
}
