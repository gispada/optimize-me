const threeCols = { xs: 12, md: 4 }
const twoCols = { xs: 12, md: 6 }

export default [
  {
    title: 'Personal information',
    subtitle: 'Lorem ipsum dolor sit amet',
    id: 'personalInformation',
    fields: [
      {
        id: 'name',
        label: 'Name',
        type: 'input',
        span: threeCols
      },
      {
        id: 'surname',
        label: 'Surname',
        type: 'input',
        span: threeCols
      },
      {
        id: 'dateOfBirth',
        label: 'Date of birth',
        type: 'date',
        span: threeCols
      },
      {
        id: 'address1',
        label: 'Address 1',
        type: 'input',
        span: twoCols
      },
      {
        id: 'address2',
        label: 'Address 2',
        type: 'input',
        span: twoCols
      },
      {
        id: 'jobTitle',
        label: 'Job title',
        type: 'input',
        span: threeCols
      },
      {
        id: 'jobLocation',
        label: 'Job location',
        type: 'input',
        span: threeCols
      },
      {
        id: 'company',
        label: 'Company',
        type: 'input',
        span: threeCols
      },
      {
        id: 'documentType',
        label: 'Document Type',
        type: 'select',
        options: [
          {
            value: 'drivingLicense',
            label: 'Driving license'
          },
          {
            value: 'passport',
            label: 'Passport'
          },
          {
            value: 'idCard',
            label: 'ID Card'
          }
        ],
        span: threeCols
      },
      {
        id: 'documentId',
        label: 'Document ID',
        type: 'input',
        span: threeCols
      },
      {
        id: 'documentExpiryDate',
        label: 'Document expiry date',
        type: 'date',
        span: threeCols
      }
    ]
  },
  {
    title: 'Additional information 1',
    id: 'additionalInformation1',
    subtitle: 'Do eiusmod tempor incididunt ut labore et dolore magna aliqua',
    fields: createFieldsBlock(9)
  },
  {
    title: 'Additional information 2',
    id: 'additionalInformation2',
    subtitle: 'Consectetur adipiscing elit',
    fields: createFieldsBlock(9)
  }
]

function createFieldsBlock(n) {
  return Array.from({ length: n }).map((_, i) => {
    const isVariant = Math.random() < 0.1
    return {
      id: `field${i + 1}`,
      label: `Field ${i + 1}`,
      type: isVariant ? 'select' : 'input',
      span: threeCols,
      ...(isVariant && {
        options: Array.from({ length: 4 }).map((_, i) => ({
          value: `option-${i + 1}`,
          label: `Option ${i + 1}`
        }))
      })
    }
  })
}
