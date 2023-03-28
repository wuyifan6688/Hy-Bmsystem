import { ref } from 'vue'
import type pageContent from '@/components/pageContent/pageContent.vue'

function usePageContent() {
  const contentRef = ref<InstanceType<typeof pageContent>>()
  function searchClick(formData: any) {
    contentRef.value?.newMust(formData)
    console.log(33, formData)
  }
  function resetClick() {
    contentRef.value?.newMust()
  }

  return { contentRef, searchClick, resetClick }
}

export default usePageContent
