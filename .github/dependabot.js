'use strict'

const getMergeMethod = (repo) => {
  if (repo.allow_merge_commit) return 'merge'
  if (repo.allow_squash_merge) return 'squash'
  return 'rebase'
}

module.exports = async ({
  github,
  context
}) => {
  const owner = context.payload.repository.owner.login
  const repo = context.payload.repository.name
  const prNumber = context.payload.pull_request.number

  const {
    data: pr
  } = await github.pulls.get({
    owner,
    repo,
    pull_number: prNumber
  })

  const isDependabotOwner = pr.user.login === 'dependabot[bot]'
  const isMergable = pr.mergeable

  if (!isDependabotOwner || !isMergable) {
    return console.log('Unable to merge', isDependabotOwner, isMergable)
  }

  await github.pulls.createReview({
    owner,
    repo,
    pull_number: prNumber,
    event: 'APPROVE'
  })

  await github.pulls.merge({
    owner,
    repo,
    pull_number: prNumber,
    merge_method: getMergeMethod(pr.head.repo)
  })
}
