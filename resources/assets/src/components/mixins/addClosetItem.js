import toastr from 'toastr'
import { swal } from '../../js/notify'

export default {
  methods: {
    async addClosetItem() {
      const { dismiss, value } = await swal({
        title: this.$t('skinlib.setItemName'),
        text: this.$t('skinlib.applyNotice'),
        inputValue: this.name,
        input: 'text',
        showCancelButton: true,
        inputValidator: val => !val && this.$t('skinlib.emptyItemName'),
      })
      if (dismiss) {
        return
      }

      const { errno, msg } = await this.$http.post(
        '/user/closet/add',
        { tid: this.tid, name: value }
      )
      if (errno === 0) {
        swal({ type: 'success', text: msg })
        this.$emit('like-toggled', true)
      } else {
        toastr.warning(msg)
      }
    },
  },
}
